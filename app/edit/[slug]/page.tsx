import EditComponent from "@/components/edit/EditComponent";

export default async function EditPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return <EditComponent slug={slug} />;
}
