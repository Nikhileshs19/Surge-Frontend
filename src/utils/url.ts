export function extractCompressorId(pathname: string): number {
    const match = pathname.match(/\/compressors\/(\d+)/);
    return match ? parseInt(match[1], 10) : 1;
  }