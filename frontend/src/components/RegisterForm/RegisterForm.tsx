import './styles.css'

export const RegisterForm = () => {
    return (
        <form action="/register" method="post">
            <div className="form-group">
                <label>Username</label>
                <input type="text" name="username" required placeholder="Enter your username" />
            </div>
            <div className="form-group">
                <label>Password</label>
                <input type="password" id="password" name="password" required placeholder="Enter your password" />
                <div id="password-strength"></div>
            </div>
            <div className="form-group">
                <label>Role</label>
                <select name="role">
                    <option value="user">user</option>
                    <option value="admin">admin</option>
                </select>
            </div>
            <div id="error-message"></div>
            <button type="submit">Register</button>
        </form>
    )
}