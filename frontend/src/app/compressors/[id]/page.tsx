import CompressorPage from "@/components/pages/compressor-page"

export default async function Page({ params }: { params: Promise<{ id: number }> }) {
  const { id } = await params

  return <CompressorPage id={id} />
}
