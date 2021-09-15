type OperationItems = {
  name: string;
  key: string;
  operation?: string;
};

export default function access(initialState: { currentUser?: API.MyItem | undefined }) {
  const { currentUser } = initialState || {};

  return {
    canAdmin: currentUser?.id === 1,
    canButton: (button: string): boolean => {
      return !!currentUser?.permissions?.find((p) => p.action === button);
    },
    canOperation: (operations: OperationItems[]): any => {
      return (
        operations.filter((op) => {
          return !!currentUser?.permissions?.find((p) => p.action === op.operation);
        }) || undefined
      );
    },
  };
}
