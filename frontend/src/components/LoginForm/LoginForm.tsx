import './styles.css'


export const LoginForm = () => {
    return (
        <form action="/login" method="post">
            <div className="form-group">
                <label>Имя пользователя</label>
                <input type="text" name="username" required placeholder="Введите имя пользователя" />
            </div>
            <div className="form-group">
                <label>Пароль</label>
                <input type="password" id="password" name="password" required placeholder="Введите пароль" />
                <div id="password-strength"></div>
            </div>
           {/* {% if error %}
            <p>{{ error }}</p>
            {% endif %} */}
            <button type="submit">Войти</button>
        </form>
    )
}