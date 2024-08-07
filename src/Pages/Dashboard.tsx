
const Dashboard = () => {
    return (
        <div className="p-4">
            <h1 className="text-2xl">Dashboard</h1>
            <p>Welcome to the protected dashboard!</p>
            <a href='/signin' className='text-blue-500'>logout</a>
        </div>
    );
};

export default Dashboard;
