import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/footer.scss"

interface Options {
  links: Record<string, string>
}

export default ((opts?: Options) => {
  const Footer: QuartzComponent = ({ displayClass, cfg }: QuartzComponentProps) => {
    const year = new Date().getFullYear()

    return (
      <footer class={`${displayClass ?? ""}`}>
        <p>
          ©{year} Compuwiki |{" "}
          <a
            href="https://github.com/compuwiki/compuwiki.github.io"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub repo
          </a>
        </p>
      </footer>
    )
  }

  Footer.css = style
  return Footer
}) satisfies QuartzComponentConstructor
