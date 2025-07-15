import { CompressorStatus } from '@/types/compressor';

export const getCompressorStatusIcon = (status: CompressorStatus): string => {
  switch (status) {
    case 'warning':
      return 'pi pi-exclamation-triangle text-yellow-400';
    case 'off':
      return 'pi pi-power-off text-red-500';
    default:
      return 'pi pi-check-circle text-green-500';
  }
};

