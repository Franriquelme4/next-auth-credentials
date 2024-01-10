import Link from "next/link"


function NavBar() {
  return (
    <nav className="flex justify-between" >
        <h1>Next Auth</h1>
        <ul>
            <li><Link rel="stylesheet" href="/">HOME</Link> </li>
            <li><Link rel="stylesheet" href="/auth/login">LOGIN</Link> </li>
            <li><Link rel="stylesheet" href="/auth/register">REGISTER</Link> </li>
        </ul>
    </nav>
  )
}

export default NavBar