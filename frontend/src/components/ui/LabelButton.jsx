/* eslint-disable react/prop-types */
import { Button } from "primereact/button";

export const LabelButton = ({ label, className, onClick }) => (
  <Button label={label} className={className} onClick={onClick} unstyled />
);
