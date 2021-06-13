import { onConfirm } from "react-confirm-pro"

interface IDescriptionHeader{
    title:string
    message:string
}

// Wrapper to make the life easier and cleaner
export function ConfirmationModalRequired(description:IDescriptionHeader,$ok:Function){
    onConfirm({
        title: (
          <h3>
            {description.title}
          </h3>
        ),
        description: (
          <p>{description.message}</p>
        ),
        onSubmit: () => {
          $ok()
        },
        onCancel: () => {
          //do nothings
        },
        btnCancel:"ยกเลิก",
        btnSubmit:"ยืนยัน",
        type:"light"
      })
}