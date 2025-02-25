import './styles.css'

export const Employees = () => {
  return (
    <div className="employee-table-container">
      <table className="employee-table">
        <thead>
          <tr>
            <th>Фамилия</th>
            <th>Имя</th>
            <th>Отчество</th>
            <th>Фамилия ИО</th>
            <th>Должность</th>
            <th>Телефон</th>
            <th>e-mail</th>
            <th>Логин Телеграм</th>
            <th>ДР, дата</th>
            <th>Категория</th>
            <th>Специализация</th>
            <th>Примечание</th>
            <th>Логин</th>
            <th>Роль</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>
              <button className="edit-button" data-user-id="{{ user.id }}">
                Изменить
              </button>
              <button className="delete-button" data-user-id="{{ user.id }}">
                Удалить
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
