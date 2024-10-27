import Image from 'next/image';
import ReactMarkdown, { Components } from 'react-markdown';
import Typography, { TypographyVariant } from '../ui/typography';

const MarkdownComponents = (variant: TypographyVariant): Components => ({
  // @ts-ignore
  p: ({ children, node }: { children: any; node: any }) => {
    const firstChild = node.children[0];

    if (firstChild.tagName === 'img') {
      const image = firstChild;
      const metastring = image.properties.alt || '';
      const alt = metastring.replace(/ *\{[^)]*\} */g, '');
      const metaWidth = metastring.match(/{(\d+)x(?:\d+)}/);
      const metaHeight = metastring.match(/{(?:\d+)x(\d+)}/);
      const width = metaWidth ? parseInt(metaWidth[1], 10) : 768;
      const height = metaHeight ? parseInt(metaHeight[1], 10) : 768;
      const isPriority = metastring.toLowerCase().includes('{priority}');
      const captionMatch = metastring.match(/{caption: (.*?)}/);
      const caption = captionMatch ? captionMatch[1] : null;

      return (
        <p>
          <Image src={image.properties.src} width={width} height={height} className="mt-5" alt={alt} priority={isPriority} placeholder="blur" />
          {caption && (
            <Typography variant="muted" className="mt-1 mb-5 text-center" aria-label={caption}>
              {alt}
            </Typography>
          )}
        </p>
      );
    }

    return <Typography variant={variant}>{children as React.ReactNode}</Typography>;
  },
  h1: ({ children }) => <Typography variant="h1">{children as React.ReactNode}</Typography>,
  h2: ({ children }) => <Typography variant="h2">{children as React.ReactNode}</Typography>,
  h3: ({ children }) => <Typography variant="h3">{children as React.ReactNode}</Typography>,
  h4: ({ children }) => <Typography variant="h4">{children as React.ReactNode}</Typography>,
  h5: ({ children }) => <Typography variant="h5">{children as React.ReactNode}</Typography>,
  h6: ({ children }) => <Typography variant="h6">{children as React.ReactNode}</Typography>,
  blockquote: ({ children }) => <Typography variant="blockquote">{children as React.ReactNode}</Typography>,
  li: ({ children }) => <li className="[&:not(:first-child)]:mt-4 pl-5 md:pl-8 space-y-1 list-inside">{children as React.ReactNode}</li>,
  ul: ({ children }) => <ul className="[&:not(:first-child)]:mt-4 pl-5 md:pl-8 space-y-1 list-disc">{children as React.ReactNode}</ul>,
  ol: ({ children }) => <ol>{children as React.ReactNode}</ol>,
});

const Markdown = ({ content, variant = 'p' }: { content?: string; variant?: TypographyVariant }) => {
  return <ReactMarkdown components={MarkdownComponents(variant)}>{content}</ReactMarkdown>;
};

export default Markdown;
