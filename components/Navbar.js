
export default function Navbar() {
  return (
    <div className="container bg-body-tertiary">       
      <div className="d-flex align-center">
        <nav className="navbar navbar-expand-lg ">
          <div className="container-fluid">
              <a className="navbar-brand" href="/">NEXTJS</a>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                      <a className="nav-link" href="/pagination">Pagination</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/calc">Calculation</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/scroll">Scrolling</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/upload">Upload</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/search">Search</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/login">Login</a>
                    </li>
                </ul>
              </div>
          </div>
        </nav>
      </div>
    </div>
  );
}