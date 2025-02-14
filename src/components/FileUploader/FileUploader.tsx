import React from "react";
import classnames from "classnames";
import readFileAsText from "@pm4ml/ts-utils/lib/file/readFileAsText";
import readFileAsBase64 from "@pm4ml/ts-utils/lib/file/readFileAsBase64";
import Field, { Loader, Placeholder, InvalidIcon } from "components/Field";
import FolderPlusIcon from "bootstrap-icons/icons/folder-plus.svg";
import TrashIcon from "bootstrap-icons/icons/trash.svg";
import IconButton from "components/IconButton";
import { WithValidationProps, WithLabelProps } from "../../hocs";
import { BaseInput } from "../shared/types";
import { Kind, InputSize, KeyCode } from "../../types";
import "./FileUploader.scss";

export interface BaseFileUploaderProps extends BaseInput {
  kind?: `${Kind}`;
  size?: `${InputSize}`;
  className?: string;
  parseAs?: "text" | "base64";
  placeholder?: string;
  file?: File;
  fileName?: string;
  required?: boolean;
  invalid?: boolean;
  pending?: boolean;
  onChange?: (content?: string) => void;
}

export type FileUploaderProps = BaseFileUploaderProps &
  Partial<WithValidationProps> &
  WithLabelProps;

export default React.forwardRef(function FileUploader(
  {
    kind = Kind.Primary,
    size = InputSize.Large,
    className,
    parseAs = "text",
    placeholder,
    file,
    fileName,
    required,
    invalid,
    pending,
    onChange,
    validation,
    label,
    ...props
  }: FileUploaderProps,
  forwardedRef: React.ForwardedRef<HTMLDivElement>
): JSX.Element {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [selectedFile, setFile] = React.useState<File | undefined>(file);
  const [selectedFileName, setFileName] = React.useState<string | undefined>(
    fileName || file?.name
  );
  const [focused, setFocused] = React.useState(false);

  React.useEffect(() => {
    setFile(file);
  }, [file]);

  React.useEffect(() => {
    if (!selectedFile && selectedFileName) {
      setFileName(fileName);
    }
  }, [fileName]);

  function enter() {
    setFocused(true);
    inputRef.current?.focus();
  }

  function leave() {
    setFocused(false);
  }

  function onChooseFileButtonClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    inputRef.current?.click();
  }
  function onRemoveFileButtonClick() {
    setFile(undefined);
    setFileName(undefined);
    onChange?.(undefined);
  }

  async function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const inputFile = e.target.files?.item(0);
    if (!inputFile) {
      return;
    }
    let parse;
    if (parseAs === "text") {
      parse = readFileAsText;
    } else {
      parse = readFileAsBase64;
    }
    const content = await parse(inputFile);
    setFile(inputFile);
    setFileName(inputFile.name);
    onChange?.(content as string);
    inputRef.current?.focus();
  }

  function onFocus(e: React.FocusEvent<HTMLInputElement>) {
    if (!focused) {
      props.onFocus?.(e);
      enter();
    }
  }

  function onBlur(e: React.FocusEvent<HTMLInputElement>) {
    if (!focused) {
      props.onBlur?.(e);
    }
  }

  function onFieldClick(e: React.MouseEvent<HTMLDivElement>): void {
    if (e.target !== inputRef.current) {
      e.preventDefault();
      e.stopPropagation();
      if (!focused) {
        enter();
      }
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    const { keyCode } = e;

    if (keyCode === KeyCode.Tab) {
      leave();
      return;
    }
    if (keyCode === KeyCode.Return) {
      e.preventDefault();
      if (selectedFileName) {
        onRemoveFileButtonClick();
      } else {
        inputRef.current?.click();
      }
    }
  }

  const button = (
    <IconButton
      /* noFill={!focused} */
      icon={selectedFileName ? <TrashIcon /> : <FolderPlusIcon />}
      className="rc-fileuploader__button"
      size={18}
      tooltipLabel={selectedFileName ? "Remove File" : "Choose File"}
      onClick={
        selectedFileName ? onRemoveFileButtonClick : onChooseFileButtonClick
      }
      kind={selectedFileName ? "danger" : undefined}
    />
  );

  const fileNameClassName = classnames([
    "rc-fileuploader",
    `rc-fileuploader--${size}`,
  ]);

  return (
    <Field
      className={className}
      kind={kind}
      size={size}
      required={required}
      invalid={invalid}
      disabled={props.disabled}
      focused={focused}
      onClick={onFieldClick}
      onClickOutside={leave}
      ref={forwardedRef}
      label={label}
      hasEmptyValue={selectedFile === undefined}
      validation={validation}
    >
      {placeholder && (
        <Placeholder
          label={placeholder}
          active={!!selectedFile || focused}
          size={size}
        />
      )}
      <input
        {...props}
        className="rc-fileuploader__input"
        type="file"
        ref={inputRef}
        onChange={onFileChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
      />
      <div className={fileNameClassName}>{selectedFileName}</div>
      {pending && <Loader size={size} />}
      {invalid && <InvalidIcon size={size} />}
      {button}
    </Field>
  );
});
