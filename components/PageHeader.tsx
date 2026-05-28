type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
};

export default function PageHeader({ eyebrow, title, subtitle }: PageHeaderProps) {
  return (
    <header className="page-header">
      {eyebrow ? <span className="page-header__eyebrow">{eyebrow}</span> : null}
      <h1 className="page-header__title">{title}</h1>
      {subtitle ? <p className="page-header__sub">{subtitle}</p> : null}
    </header>
  );
}
