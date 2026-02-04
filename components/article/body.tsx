export default function ArticleBody({ content }: { content: string }) {
  return (
    <article className="w-full ">
      <div
        className="prose prose-lg md:prose-xl dark:prose-invert prose-inkflow max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />

      <div className="flex items-center justify-center gap-4 my-16">
        <div className="h-[1px] w-12 bg-border" />
        <div className="w-2 h-2 rounded-full bg-accent-primary" />
        <div className="h-[1px] w-12 bg-border" />
      </div>
    </article>
  );
}
