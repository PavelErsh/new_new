import { Calendar } from '../../Calendar/Calendar';
import './styles.css'


export const MainPage = () => {
  return (
    <div className='section-center'>
      <div className="button-container">
        <button className="welcome-btn">
          <a href="/objects/">Объекты</a>
        </button>
        <button className="welcome-btn">
          <a href="/register_contracts/">Договоры</a>
        </button>
        <button className="welcome-btn">
          <a href="/customers/">Заказчики</a>
        </button>
        <button className="welcome-btn">
          <a href="/dashboards/">Проекты</a>
        </button>
        <button className="welcome-btn">
          <a href="/dashboards/">Дашборды</a>
        </button>
        <button className="welcome-btn">
          <a href="/users/">Сотрудники</a>
        </button>
        <button className="welcome-btn">
          <a href="/directory/">Справочник</a>
        </button>
        {/* {% if role == 'admin' %}
    <button className="welcome-btn"><a href="/users/">Доступ</a></button>
    {% endif %} */}
      </div>
      <div className="widget-container">
        <div className="table-widget">
          <table>
            <thead>
              <tr>
                <th>Номер</th>
                <th>Шифр</th>
                <th>Наименование</th>
                <th>Заказчик</th>
                <th>Ответственный исполнитель</th>
                <th>Статус</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>A001</td>
                <td>Объект 1</td>
                <td>Заказчик 1</td>
                <td>Иванов Иван</td>
                <td>В процессе</td>
              </tr>
              <tr>
                <td>2</td>
                <td>A002</td>
                <td>Объект 2</td>
                <td>Заказчик 2</td>
                <td>Петров Петр</td>
                <td>Завершен</td>
              </tr>
              <tr>
                <td>3</td>
                <td>A003</td>
                <td>Объект 3</td>
                <td>Заказчик 3</td>
                <td>Сидоров Сидор</td>
                <td>Отменен</td>
              </tr>
              <tr>
                <td>4</td>
                <td>A004</td>
                <td>Объект 4</td>
                <td>Заказчик 4</td>
                <td>Кузнецов Кузьма</td>
                <td>В процессе</td>
              </tr>
              <tr>
                <td>5</td>
                <td>A005</td>
                <td>Объект 5</td>
                <td>Заказчик 5</td>
                <td>Смирнов Сергей</td>
                <td>Завершен</td>
              </tr>
            </tbody>
          </table>
        </div>
        <Calendar />
      </div>
    </div>
  );
};
