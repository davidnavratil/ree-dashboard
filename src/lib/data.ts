import fs from 'fs/promises'
import path from 'path'

export async function loadData<T>(filename: string): Promise<T> {
  const filePath = path.join(process.cwd(), 'public', 'data', filename)
  const raw = await fs.readFile(filePath, 'utf-8')
  return JSON.parse(raw) as T
}
