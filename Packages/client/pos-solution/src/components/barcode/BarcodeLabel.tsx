import { forwardRef } from "react";
import Barcode from "react-barcode";

export type BarcodeLabelProps = {
  code: string;
  productName: string;
  comapnyname: string;
  mrp: number;
};
export const BarcodeLabel = forwardRef<HTMLDivElement, BarcodeLabelProps>(
  (props, ref) => {
    return (
      <div
        ref={ref}
        className="w-56 p-2 border border-slate-300 rounded-md bg-white flex flex-col items-center justify-center gap-1 text-center"
      >
        <div className="flex items-center gap-2">
          <p className="text-[11px] font-semibold uppercase tracking-wide">
            {props.comapnyname}
          </p>
          <p className="text-[11px]">MRP: ₹{props.mrp.toFixed(2)}</p>
        </div>
        <div className="mt-0 flex justify-center gap-2">
          <p className="text-[11px] font-medium text-slate-800 truncate w-full">
            <Barcode
              value={props.code}
              format="CODE128" //format="CODE128"
              height={50}
              width={2}
              displayValue={true}
              fontSize={12}
              margin={0}
            ></Barcode>
          </p>
        </div>
      </div>
    );
  }
);
BarcodeLabel.displayName = "BarcodeLabel";
