import React from "react";
import { createContainer } from 'unstated-next';

interface TxStreetState {
  ids: string[];
  setIds: (ids: string[]) => void;
}

export const TxStreetContainer = createContainer<TxStreetState>(() => {
  const [ids, setIds] = React.useState<string[]>([]);
  return {ids, setIds};
});
