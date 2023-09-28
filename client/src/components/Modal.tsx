import { useState } from "react";
import { Dialog } from "@headlessui/react";

export default function Modal({ modalIsOpen, cancelFn }) {
  console.log("modalIsOpen", modalIsOpen);
  let [isOpen, setIsOpen] = useState(true);

  return (
    <Dialog
      className="relative z-50"
      open={modalIsOpen}
      onClose={() => setIsOpen(false)}
    >
      <div
        className="fixed inset-0 bg-black/30"
        aria-hidden="true"
        onClick={cancelFn}
      />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-sm rounded bg-white">
          <Dialog.Title>Deactivate account</Dialog.Title>
          <Dialog.Description>
            This will permanently deactivate your account
          </Dialog.Description>

          <p>
            Are you sure you want to deactivate your account? All of your data
            will be permanently removed. This action cannot be undone.
          </p>

          <button onClick={cancelFn}>Deactivate</button>
          <button onClick={cancelFn}>Cancel</button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
