import { useMemo } from "react";

interface UseStylesProps<T> {
  props: {
    [key: string]: any;
  };
  styles: T;
  //   {
  //     //elements
  //     [key: string]: {
  //       base: string[];

  //       [key: string]: string[];
  //     };
  //   }
}

function useStyles<T extends Record<string, any>>({
  props,
  styles,
}: UseStylesProps<T>): { [key in keyof T]: string[] } {
  const s = useMemo(() => {
    const elements = Object.keys(styles);
    const propKeys = Object.keys(props);

    return elements.reduce((_prev, _curr) => {
      const element = styles[_curr];

      const elementStyles = [...element.base];

      propKeys.forEach((prop) => {
        if (element[prop]) {
          const propValue = props[prop];

          if (propValue != undefined) {
            elementStyles.push(...element[prop][propValue]);
          } else {
            elementStyles.push(...element[prop].default);
          }
        }
      });

      return { ..._prev, [_curr]: elementStyles };
    }, {} as { [key in keyof T]: string[] });
  }, [props, styles]);

  return s;
}

export default useStyles;
