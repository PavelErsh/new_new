import "./styles.css";

export const Settings = () => {
  return (
    <div className="images">
      <div className="image-container">
        <h1 className="section-title">Загрузить Изображение</h1>
        <form
          id="bg-upload-form"
          action="/upload_image/"
          method="post"
          className="upload-form"
        >
          <label className="file-label">Загрузить фон</label>
          <div className="custom-file-input">
            <input
              id="bg-file-input"
              name="file"
              type="file"
              className="file-input"
              accept="image/*"
            />
            <button type="button" className="custom-upload-button">
              Выбрать файл
            </button>
          </div>
          <div
            className="preview-wrapper"
            id="preview-wrapper"
            style={{ display: "none" }}
          >
            <img
              id="preview-image"
              className="preview-image"
              alt="Предпросмотр"
              style={{ display: "none" }}
            />
            <button type="button" className="remove-button">
              &times;
            </button>
          </div>
          <div
            id="bg-notification"
            className="notification"
            style={{ display: "none" }}
          >
            Пожалуйста, загрузите изображение.
          </div>
          <input type="submit" value="Отправить" className="submit-button" />
        </form>
      </div>
      <div className="image-container">
        <h1 className="section-title">Загрузить Логотип</h1>
        <form
          id="logo-upload-form"
          action="/upload-logo/"
          method="post"
          className="upload-form"
        >
          <label className="file-label">Загрузить логотип</label>
          <div className="custom-file-input">
            <input
              id="logo-file-input"
              name="file"
              type="file"
              className="file-input"
              accept="image/*"
            />

            <button type="button" className="custom-upload-button">
              Выбрать файл
            </button>
          </div>
          <div
            className="preview-wrapper"
            id="logo-preview-wrapper"
            style={{ display: "none" }}
          >
            <img
              id="logo-preview-image"
              className="preview-image"
              alt="Предпросмотр"
              style={{ display: "none" }}
            />
            <button type="button" className="remove-button">
              &times;
            </button>
          </div>
          <div
            id="logo-notification"
            className="notification"
            style={{ display: "none" }}
          >
            Пожалуйста, загрузите логотип.
          </div>
          <input type="submit" value="Отправить" className="submit-button" />
        </form>
      </div>
    </div>
  );
};
