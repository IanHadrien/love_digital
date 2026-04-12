export interface Moment {
  id: string;
  title: string;
  text: string;
  imageUrl: string;
}

export interface AlmanaqueData {
  id: string;
  coupleName: string;
  startDate: string;
  moments: Moment[];
  finalMessage: string;
  musicUrl: string;
  createdAt: string;
}

const STORAGE_KEY = 'almanaque_data';

function getAllAlmanaques(): Record<string, AlmanaqueData> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
}

export function saveAlmanaque(data: AlmanaqueData): string {
  const all = getAllAlmanaques();
  all[data.id] = data;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  return data.id;
}

export function getAlmanaque(id: string): AlmanaqueData | null {
  const all = getAllAlmanaques();
  return all[id] || null;
}

export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
