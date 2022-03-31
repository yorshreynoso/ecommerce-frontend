import Menu from './Menu';
import '../styles/index.css';

const Layout = ({title = 'Title', description = 'Description', className, children }) => {
    return(
        <div>
            <Menu />
            <div className="mt-4 p-5 bg-primary text-white rounded jumbotron">
                <h2>{title}</h2>
                <p className = "lead"> {description}</p>
            </div>
            <div className={className}>{children}</div>

        </div>
    )
}

export default Layout;