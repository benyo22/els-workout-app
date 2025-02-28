import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useState } from "react";

export const EditUser = () => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button
        label="Szerkesztés"
        className="auth-button mt-5 font-semibold"
        onClick={() => setVisible(true)}
      ></Button>

      <Dialog
        visible={visible}
        modal
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
        content={
          <form>
            <div className="w-500 h-500 bg-red-500"></div>
          </form>
        }
      ></Dialog>
    </>
  );
};
