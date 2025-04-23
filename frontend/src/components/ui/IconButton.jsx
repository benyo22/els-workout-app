/* eslint-disable react/prop-types */
import { Button } from "primereact/button";

export const IconButton = ({ icon, className, onClick }) => (
  <Button icon={icon} className={className} onClick={onClick} unstyled />
);
