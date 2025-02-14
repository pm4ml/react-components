import classnames from "classnames";
import Row from "components/Flexbox/Row";
import Icon from "components/Icon";
import { ValidationMessage } from "@pm4ml/ts-utils/lib/validation";
import Check from "bootstrap-icons/icons/check.svg";
import X from "bootstrap-icons/icons/x.svg";
import "./ValidationCard.scss";

const ActiveValidationIcon = (
  <Icon className="rc-validation__message__icon" icon={<X />} size={20} />
);

const InactiveValidationIcon = (
  <Icon className="rc-validation__message__icon" icon={<Check />} size={20} />
);

const UnsetValidationIcon = (
  <div className="rc-validation__message__icon--unset" />
);

interface ValidationIconProps {
  active?: boolean;
}

const ValidationIcon = ({ active }: ValidationIconProps) => {
  if (active === true) {
    return ActiveValidationIcon;
  }
  if (active === false) {
    return InactiveValidationIcon;
  }
  return UnsetValidationIcon;
};

const ValidationMessageRow = ({ message, active }: ValidationMessage) => {
  const className = classnames([
    "rc-validation__message",
    active && "rc-validation__message--invalid",
    active === false && "rc-validation__message--valid",
  ]);
  return (
    <Row>
      <li className={className}>
        <div className="rc-validation__message__icon-container">
          <ValidationIcon active={active} />
        </div>
        <span className="rc-validation__message__text">{message}</span>
      </li>
    </Row>
  );
};

interface ValidationCardProps {
  empty?: boolean;
  messages?: ValidationMessage[];
  required?: boolean;
  invalid?: boolean;
}

export default function ValidationCard({
  empty,
  messages = [],
  required,
  invalid,
}: ValidationCardProps) {
  const unset =
    !required && messages.every(({ active }) => active === undefined);
  const success = messages.every(({ active }) => active === false);
  const className = classnames([
    "rc-validation__messages",
    required && "rc-validation__messages--required",
    invalid && "rc-validation__messages--invalid",
    success && "rc-validation__messages--valid",
    unset && "rc-validation__messages--unset",
  ]);
  return (
    <div>
      <ul className={className}>
        {messages.map(({ message, active }, i) => (
          <ValidationMessageRow
            key={i.toString()}
            message={message}
            active={empty ? undefined : active}
          />
        ))}
      </ul>
    </div>
  );
}
