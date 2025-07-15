import { AfterViewInit, OnChanges, OnDestroy, EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
//@ts-ignore 
declare var CanvasJS: any;
declare class CanvasJSStockChart implements AfterViewInit, OnChanges, OnDestroy {
    static _cjsStockChartContainerId: number;
    stockChart: any;
    stockChartContainerId: any;
    prevStockChartOptions: any;
    shouldUpdateChart: boolean;
    isDOMPresent: boolean;
    options: any;
    styles: any;
    stockChartInstance: EventEmitter<object>;
    constructor();
    ngDoCheck(): void;
    ngOnChanges(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CanvasJSStockChart, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CanvasJSStockChart, "canvasjs-stockchart", never, { "options": "options"; "styles": "styles"; }, { "stockChartInstance": "stockChartInstance"; }, never, never>;
}
export { CanvasJSStockChart, CanvasJS };
