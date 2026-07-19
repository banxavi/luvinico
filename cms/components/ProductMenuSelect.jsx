import {useEffect, useMemo, useRef, useState} from 'react'
import {Box, Card, Select, Stack, Text} from '@sanity/ui'
import {PatchEvent, set, unset, useClient, useFormValue} from 'sanity'

const CATEGORY_MENU_QUERY = /* groq */ `
  *[_id == $id][0]{
    title,
    dropdownMenus[]{
      name,
      "slug": slug.current,
      subTabs[]{
        name,
        "slug": slug.current
      }
    },
    standardMenus[]{
      name,
      "slug": slug.current
    }
  }
`

function readSlug(value) {
  if (!value) return ''
  if (typeof value === 'string') return value
  return value.current ?? ''
}

function FieldLabel({children}) {
  return (
    <Box paddingY={1}>
      <Text as="label" size={1} weight="medium">
        {children}
      </Text>
    </Box>
  )
}

function MenuSelect({value, onChange, children}) {
  return (
    <Card radius={2}>
      <Select value={value} onChange={onChange}>
        {children}
      </Select>
    </Card>
  )
}

function StatusCard({tone, children}) {
  return (
    <Card padding={3} radius={2} tone={tone}>
      <Text size={1} muted={!tone}>
        {children}
      </Text>
    </Card>
  )
}

export default function ProductMenuSelect(props) {
  const {value, onChange} = props
  const client = useClient({apiVersion: '2026-02-01'})
  const categoryRef = useFormValue(['category'])
  const categoryId = categoryRef?._ref

  const [category, setCategory] = useState(null)
  const [loading, setLoading] = useState(false)
  const previousCategoryId = useRef(categoryId)

  useEffect(() => {
    if (!categoryId) {
      setCategory(null)
      return undefined
    }

    let cancelled = false
    setLoading(true)

    client
      .fetch(CATEGORY_MENU_QUERY, {id: categoryId})
      .then((doc) => {
        if (!cancelled) setCategory(doc)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [categoryId, client])

  useEffect(() => {
    if (previousCategoryId.current && previousCategoryId.current !== categoryId) {
      onChange(PatchEvent.from(unset()))
    }
    previousCategoryId.current = categoryId
  }, [categoryId, onChange])

  const dropdownMenus = useMemo(() => category?.dropdownMenus ?? [], [category])
  const standardMenus = useMemo(() => category?.standardMenus ?? [], [category])
  const hasDropdown = dropdownMenus.length > 0
  const hasStandard = standardMenus.length > 0

  const menuKind =
    value?.menuKind ??
    (hasDropdown && !hasStandard ? 'dropdown' : hasStandard && !hasDropdown ? 'standard' : '')
  const groupSlug = value?.groupSlug ?? ''
  const itemSlug = value?.itemSlug ?? ''

  const patchValue = (next) => {
    onChange(PatchEvent.from(next ? set(next) : unset()))
  }

  if (!categoryId) {
    return (
      <StatusCard tone="caution">
        Chọn danh mục trước (có thể tạo danh mục mới từ trường Danh mục).
      </StatusCard>
    )
  }

  if (loading) {
    return <StatusCard>Đang tải menu từ danh mục…</StatusCard>
  }

  if (!hasDropdown && !hasStandard) {
    return (
      <StatusCard tone="caution">
        Danh mục &ldquo;{category?.title ?? ''}&rdquo; chưa có menu. Mở Danh mục và thêm Menu
        dropdown hoặc Standard menu.
      </StatusCard>
    )
  }

  const selectedGroup = dropdownMenus.find((group) => readSlug(group.slug) === groupSlug)
  const subTabs = selectedGroup?.subTabs ?? []

  return (
    <Stack space={4}>
      {hasDropdown && hasStandard ? (
        <Stack space={3}>
          <FieldLabel>Kiểu menu</FieldLabel>
          <MenuSelect
            value={menuKind}
            onChange={(event) => {
              const kind = event.currentTarget.value
              if (!kind) {
                patchValue(null)
                return
              }
              patchValue({menuKind: kind, groupSlug: '', itemSlug: '', itemName: ''})
            }}
          >
            <option value="">— Chọn kiểu —</option>
            <option value="dropdown">Menu dropdown (nhóm + sub-tab)</option>
            <option value="standard">Standard menu</option>
          </MenuSelect>
        </Stack>
      ) : null}

      {(menuKind === 'dropdown' || (hasDropdown && !hasStandard)) && hasDropdown ? (
        <Stack space={4}>
          <Stack space={3}>
            <FieldLabel>Nhóm menu (dropdown)</FieldLabel>
            <MenuSelect
              value={groupSlug}
              onChange={(event) => {
                const slug = event.currentTarget.value
                if (!slug) {
                  patchValue(null)
                  return
                }
                patchValue({
                  menuKind: 'dropdown',
                  groupSlug: slug,
                  itemSlug: '',
                  itemName: '',
                })
              }}
            >
              <option value="">— Chọn nhóm —</option>
              {dropdownMenus.map((group) => {
                const slug = readSlug(group.slug)
                return (
                  <option key={slug} value={slug}>
                    {group.name}
                  </option>
                )
              })}
            </MenuSelect>
          </Stack>

          {groupSlug ? (
            <Stack space={3}>
              <FieldLabel>Sub-tab</FieldLabel>
              <MenuSelect
                value={itemSlug}
                onChange={(event) => {
                  const slug = event.currentTarget.value
                  if (!slug) {
                    patchValue({
                      menuKind: 'dropdown',
                      groupSlug,
                      itemSlug: '',
                      itemName: '',
                    })
                    return
                  }
                  const tab = subTabs.find((item) => readSlug(item.slug) === slug)
                  patchValue({
                    menuKind: 'dropdown',
                    groupSlug,
                    itemSlug: slug,
                    itemName: tab?.name ?? slug,
                  })
                }}
              >
                <option value="">— Chọn sub-tab —</option>
                {subTabs.map((tab) => {
                  const slug = readSlug(tab.slug)
                  return (
                    <option key={slug} value={slug}>
                      {tab.name}
                    </option>
                  )
                })}
              </MenuSelect>
            </Stack>
          ) : null}
        </Stack>
      ) : null}

      {(menuKind === 'standard' || (!hasDropdown && hasStandard)) && hasStandard ? (
        <Stack space={3}>
          <FieldLabel>Loại trong menu</FieldLabel>
          <MenuSelect
            value={itemSlug}
            onChange={(event) => {
              const slug = event.currentTarget.value
              if (!slug) {
                patchValue(null)
                return
              }
              const item = standardMenus.find((entry) => readSlug(entry.slug) === slug)
              patchValue({
                menuKind: 'standard',
                groupSlug: '',
                itemSlug: slug,
                itemName: item?.name ?? slug,
              })
            }}
          >
            <option value="">— Chọn loại —</option>
            {standardMenus.map((item) => {
              const slug = readSlug(item.slug)
              return (
                <option key={slug} value={slug}>
                  {item.name}
                </option>
              )
            })}
          </MenuSelect>
        </Stack>
      ) : null}

      {itemSlug ? (
        <Text size={1} muted>
          Slug trên site:{' '}
          <Text as="span" size={1} weight="medium">
            {itemSlug}
          </Text>
          {value?.itemName ? ` (${value.itemName})` : ''}
        </Text>
      ) : null}
    </Stack>
  )
}
