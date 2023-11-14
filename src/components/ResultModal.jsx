import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

const ResultModal = forwardRef(function ResultModal(
  { timeRemaining, targetTime, onReset },
  ref
) {
  const dialogRef = useRef();
  useImperativeHandle(ref, () => {
    return {
      open() {
        dialogRef.current.showModal();
      }
    };
  });

  const userLost = timeRemaining <= 0;
  const score = Math.round((1 - timeRemaining / (targetTime * 1000)) * 100);
  // close the dialog when click out side the box
  const closeHandler = (e) => {
    const dialogDimensions = ref.current.getBoundingClientRect();
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      ref.current.close();
    }
  };

  return createPortal(
    <dialog className="result-modal" ref={dialogRef} onClick={closeHandler} onClose={onReset}>
      {userLost ? <h2>You Lost</h2> : <h2>Your Score: {score}</h2>}
      <p>
        The Target Time Was <strong>{targetTime} seconds.</strong>
      </p>
      <p>
        You stopped the timer with <strong>{(timeRemaining / 1000).toFixed(2)} seconds left.</strong>
      </p>
      <form method="dialog" onSubmit={onReset}>
        <button>Close</button>
      </form>
    </dialog>,
    document.getElementById('modal')
  );
});

export default ResultModal;
