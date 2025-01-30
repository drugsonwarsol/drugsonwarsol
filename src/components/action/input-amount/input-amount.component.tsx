import type { FC, FormEvent } from "react";
import { useState } from "react";
import Button from "../../button/button.component";
import Input from "../../input/input.component";
import CurrencyInput from "react-currency-input-field";
import DialogBox from "../../dialog-box/dialog-box.component";
import { InputForm } from "./input-amount.styles";

type InputAmountProps = {
  name: string;
  type?: "currency" | "text" | "number";
  labelText: string;
  handleValue: Function;
  goBack?: Function;
};

const InputAmount: FC<InputAmountProps> = ({
  name,
  type = "number",
  labelText,
  handleValue,
  goBack,
}) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleOnSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleValue(inputValue);
  };

  const handleInputChange = (value: string | undefined) => {
    if (type === "currency") {
      setInputValue(value || "");
    } else {
      setInputValue(value || "");
    }
  };

  const handleGoBack = () => {
    if (goBack && inputValue) {
      // Pass the current input value when going back
      handleValue(inputValue);
    } else if (goBack) {
      goBack();
    }
  };

  const getInputType = () => {
    switch (type) {
      case "currency":
        return (
          <CurrencyInput
            prefix="$"
            name={name}
            value={inputValue}
            onValueChange={(value) => handleInputChange(value)}
          />
        );
      case "text":
        return (
          <Input 
            autoFocus 
            name={name}
            value={inputValue}
            onChange={(e) => handleInputChange(e.target.value)}
          />
        );
      default:
        return (
          <Input 
            type="tel" 
            autoFocus 
            name={name}
            value={inputValue}
            onChange={(e) => handleInputChange(e.target.value)}
          />
        );
    }
  };

  return (
    <InputForm onSubmit={handleOnSubmit}>
      <DialogBox>
        <label>{labelText}</label>
        {getInputType()}
        <Button type="submit">submit</Button>
        {goBack && <Button onClick={handleGoBack} type="button">back</Button>}
      </DialogBox>
    </InputForm>
  );
};

export default InputAmount;