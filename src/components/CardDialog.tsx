import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast"

export interface CardDialogProps {
  dialog: boolean;
  selectedList: string;
  addCard: (title: string, card: string) => void;
  closeDialog: () => void;
}

function CardDialog({ dialog, selectedList, addCard, closeDialog } : CardDialogProps) {
  const [name, setName] = useState("");
  const { toast } = useToast();
  const emptyNameAlert = () => {      
    toast({
      variant: "destructive",
      description: "Please enter a name!",
      duration: 1500
    })
  }
  const inputSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createCard();
  }

  function createCard() {
    if (name !== "") {
      closeDialog();
      if (name.length > 25) {
        addCard(selectedList, name.substring(0, 25) + '...'); // Truncate
      } else {
        addCard(selectedList, name);
      }
      setName(""); // Reset to empty
    } else {
      emptyNameAlert();
    }
  }

  return (
    <>
    {dialog && (<div className="relative z-10" aria-labelledby="Dialog-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3 className="text-base font-semibold leading-6 text-gray-900" id="Dialog-title">Add Card</h3>
                  <form onSubmit={(e) => inputSubmit(e) } className="bg-white rounded pt-2">
                    <input value={name} onChange={(e) => setName(e.target.value)} className="appearance-none w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder="New Card"/>
                  </form>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button onClick={createCard} type="button" className="inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm bg-purple-700 hover:bg-purple-800 sm:ml-3 sm:w-auto">Create</button>
              <button onClick={() => {setName(""); closeDialog();}} type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>)}
    </>
  )
}

export default CardDialog;