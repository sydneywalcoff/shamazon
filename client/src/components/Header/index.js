const Header = () => {
    return (
        <header className="row">
            <div className="col my-3">shamazon.</div>
            {/* search bar */}
            <div className='col-4'></div>
            {/* signin */}
            <div className ="col text-end my-3">signin.</div>
            <div className="col my-3 text-end">cart</div>
        </header>
    );
};

export default Header;