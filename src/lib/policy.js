import { readFile } from 'fs/promises';
import path from 'path';
import { marked } from 'marked';

/** Map route slug (from footer href) → markdown filename in src/data/policy */
const POLICY_CONTENT_FILES = {
  'mua-hang': 'huong-dan-mua-hang.md',
  'thanh-toan': 'chinh-sach-thanh-toan.md',
  'van-chuyen': 'chinh-sach-van-chuyen.md',
  'doi-tra': 'chinh-sach-doi-tra-hang-hoa.md',
  'bao-hanh': 'chinh-sach-bao-hanh.md',
  'bao-mat': 'chinh-sach-bao-mat.md',
};

const POLICY_DIR = path.join(process.cwd(), 'src/data/policy');

marked.setOptions({
  gfm: true,
  breaks: false,
});

function stripLeadingH1(markdown) {
  return markdown.replace(/^#\s+.+\r?\n+/, '');
}

/**
 * @param {string} policySlug
 * @returns {Promise<string | null>}
 */
export async function getPolicyHtml(policySlug) {
  const filename = POLICY_CONTENT_FILES[policySlug];
  if (!filename) {
    return null;
  }

  const filePath = path.join(POLICY_DIR, filename);
  const markdown = await readFile(filePath, 'utf-8');
  return marked.parse(stripLeadingH1(markdown));
}
