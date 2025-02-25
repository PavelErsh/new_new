import './styles.css'

export const Contracts = () => {
  return (
    <div className="contract-table-container">
      <table className="contract-table">
        <thead>
          <tr>
            <th>Шифр объекта</th>
            <th>Наименование объекта</th>
            <th>Заказчик</th>
            <th>Исполнитель</th>
            <th>Номер договора</th>
            <th>Статус</th>
            <th>Стадия</th>
            <th>Скан подписанного договора</th>
            <th>Оригинал подписанного договора</th>
            <th>% выполнения</th>
            <th>Дата подписания договора</th>
            <th>Дата окончания договора</th>
            <th>Стоимость договора</th>
            <th>Получено</th>
            <th>Остаток</th>
            <th>Скан подписанного акта выполненных работ</th>
            <th>Оригинал подписанного акта выполненных работ</th>
            <th>Объемы</th>
            <th>Примечания</th>
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
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>
              <button
                className="edit-button"
                data-contract-id="{{ contract.id }}"
              >
                Изменить
              </button>
              <button
                className="delete-button"
                data-contract-id="{{ contract.id }}"
              >
                Удалить{" "}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
