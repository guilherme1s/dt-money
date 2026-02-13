import { HeaderContainer, HeaderContent, NewTransactionButton } from "./styles";
import logoImg from "../../assets/Logo.svg";
import * as Dialog from "@radix-ui/react-dialog";
import { NewTransationsModal } from "../NewTransactionModal";

export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImg} alt="" />

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <NewTransactionButton>Nova Transação</NewTransactionButton>
          </Dialog.Trigger>

         <NewTransationsModal />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  );
}
