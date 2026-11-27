const links = [
  { label: 'Register', href: '/register' },
  { label: 'Products', href: '/products' },
]

export default function Navbar({ onNavigate, activePath }) {
  return (
    <header className="student-navbar">
      <a className="student-navbar-brand" href="/register" onClick={(event) => onNavigate(event, '/register')}>Workspace</a>
      <nav className="student-navbar-links" aria-label="Main navigation">
        {links.map(({ label, href }) => (
          <a
            className={activePath === href ? 'active' : ''}
            href={href}
            key={href}
            onClick={(event) => onNavigate(event, href)}
          >
            {label}
          </a>
        ))}
      </nav>
    </header>
  )
}
