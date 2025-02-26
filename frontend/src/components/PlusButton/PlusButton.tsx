import { Button } from "antd";
import "./styles.css";

interface PlusButtonProps {
  onClick: () => void;
  isVisible: boolean;
  isAdmin?: boolean;
}

const PlusButton = ({ onClick, isVisible, isAdmin }: PlusButtonProps) => {
  const shouldRender = isAdmin !== undefined ? isVisible && isAdmin : isVisible;

  return (
    shouldRender && (
      <Button className="plus-btn" type="dashed" onClick={onClick}>
        +
      </Button>
    )
  );
};

export default PlusButton;
