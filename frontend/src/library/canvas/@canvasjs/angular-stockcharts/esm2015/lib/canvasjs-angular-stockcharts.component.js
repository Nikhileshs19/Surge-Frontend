/*
CanvasJS Angular StockChart- https://canvasjs.com/
Copyright 2024 fenopix

--------------------- License Information --------------------
The software in CanvasJS Angular StockChart is free and open-source. But, CanvasJS Angular StockChart relies on CanvasJS StockChart which requires a valid CanvasJS StockChart license for commercial use. Please refer to the following link for further details https://canvasjs.com/license/

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/
/*tslint:disable*/
/*eslint-disable*/
/*jshint ignore:start*/
import { Component, Input, Output, EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
if (typeof document === 'object' && !!document) {
    //@ts-ignore
    var CanvasJS = require('../../../stockcharts');
}
class CanvasJSStockChart {
    constructor() {
        this.shouldUpdateChart = false;
        this.isDOMPresent = typeof document === "object" && !!document;
        this.stockChartInstance = new EventEmitter();
        this.options = this.options ? this.options : {};
        this.styles = this.styles ? this.styles : { width: "100%", position: "relative" };
        this.styles.height = this.options.height ? this.options.height + "px" : "400px";
        this.stockChartContainerId = 'canvasjs-angular-stockchart-container-' + CanvasJSStockChart._cjsStockChartContainerId++;
    }
    ngDoCheck() {
        if (this.prevStockChartOptions != this.options) {
            this.shouldUpdateChart = true;
        }
    }
    ngOnChanges() {
        //Update Chart Options & Render
        if (this.shouldUpdateChart && this.stockChart) {
            this.stockChart.options = this.options;
            this.stockChart.render();
            this.shouldUpdateChart = false;
            this.prevStockChartOptions = this.options;
        }
    }
    ngAfterViewInit() {
        if (this.isDOMPresent) {
            this.stockChart = new CanvasJS.StockChart(this.stockChartContainerId, this.options);
            this.stockChart.render();
            this.prevStockChartOptions = this.options;
            this.stockChartInstance.emit(this.stockChart);
        }
    }
    ngOnDestroy() {
        if (this.stockChart)
            this.stockChart.destroy();
    }
}
CanvasJSStockChart._cjsStockChartContainerId = 0;
CanvasJSStockChart.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: CanvasJSStockChart, deps: [], target: i0.ɵɵFactoryTarget.Component });
CanvasJSStockChart.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.17", type: CanvasJSStockChart, selector: "canvasjs-stockchart", inputs: { options: "options", styles: "styles" }, outputs: { stockChartInstance: "stockChartInstance" }, usesOnChanges: true, ngImport: i0, template: '<div *ngIf="isDOMPresent" id="{{stockChartContainerId}}" [ngStyle]="styles"></div>', isInline: true, directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }] });
i0.ɵɵngDeclareClassMetadata({
    minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: CanvasJSStockChart, decorators: [{
        type: Component,
        args: [{
            selector: 'canvasjs-stockchart',
            template: '<div *ngIf="isDOMPresent" id="{{stockChartContainerId}}" [ngStyle]="styles"></div>'
        }]
    }], ctorParameters: function () { return []; }, propDecorators: {
        options: [{
            type: Input
        }], styles: [{
            type: Input
        }], stockChartInstance: [{
            type: Output
        }]
    }
});
export { CanvasJSStockChart, CanvasJS };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FudmFzanMtYW5ndWxhci1zdG9ja2NoYXJ0cy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jYW52YXNqcy1hbmd1bGFyLXN0b2NrY2hhcnRzL3NyYy9saWIvY2FudmFzanMtYW5ndWxhci1zdG9ja2NoYXJ0cy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7RUFhRTtBQUVGLGtCQUFrQjtBQUNsQixrQkFBa0I7QUFDbEIsdUJBQXVCO0FBQ3ZCLE9BQU8sRUFBRSxTQUFTLEVBQXVDLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7QUFFNUcsSUFBRyxPQUFPLFFBQVEsS0FBSyxRQUFRLElBQUksQ0FBQyxDQUFDLFFBQVEsRUFBRTtJQUM5QyxZQUFZO0lBQ1osSUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLHVCQUF1QixDQUFDLENBQUM7Q0FDaEQ7QUFFRCxNQUtNLGtCQUFrQjtJQWdCdkI7UUFYQSxzQkFBaUIsR0FBRyxLQUFLLENBQUM7UUFDMUIsaUJBQVksR0FBRyxPQUFPLFFBQVEsS0FBSyxRQUFRLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQztRQVExRCx1QkFBa0IsR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO1FBRy9DLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQ2hELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsQ0FBQztRQUNsRixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7UUFFaEYsSUFBSSxDQUFDLHFCQUFxQixHQUFHLHdDQUF3QyxHQUFHLGtCQUFrQixDQUFDLHlCQUF5QixFQUFFLENBQUM7SUFDeEgsQ0FBQztJQUVELFNBQVM7UUFDUixJQUFHLElBQUksQ0FBQyxxQkFBcUIsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQzlDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUM7U0FDOUI7SUFDRixDQUFDO0lBRUQsV0FBVztRQUNWLCtCQUErQjtRQUMvQixJQUFHLElBQUksQ0FBQyxpQkFBaUIsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQzdDLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDdkMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUN6QixJQUFJLENBQUMsaUJBQWlCLEdBQUcsS0FBSyxDQUFDO1lBQy9CLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1NBQzFDO0lBQ0YsQ0FBQztJQUVELGVBQWU7UUFDZCxJQUFHLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDckIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLFFBQVEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLHFCQUFxQixFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNwRixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ3pCLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQzFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQzlDO0lBQ0YsQ0FBQztJQUVELFdBQVc7UUFDVixJQUFHLElBQUksQ0FBQyxVQUFVO1lBQ2pCLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDNUIsQ0FBQzs7QUFuRE0sNENBQXlCLEdBQUcsQ0FBQyxDQUFDO2dIQURoQyxrQkFBa0I7b0dBQWxCLGtCQUFrQix5TEFIYixvRkFBb0Y7NEZBR3pGLGtCQUFrQjtrQkFMdkIsU0FBUzttQkFBQztvQkFDVixRQUFRLEVBQUUscUJBQXFCO29CQUMvQixRQUFRLEVBQUUsb0ZBQW9GO2lCQUM5RjswRUFXQSxPQUFPO3NCQUROLEtBQUs7Z0JBR04sTUFBTTtzQkFETCxLQUFLO2dCQUlOLGtCQUFrQjtzQkFEakIsTUFBTTs7QUEwQ1IsT0FBTyxFQUNOLGtCQUFrQixFQUNsQixRQUFRLEVBQ1IsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG5DYW52YXNKUyBBbmd1bGFyIFN0b2NrQ2hhcnQtIGh0dHBzOi8vY2FudmFzanMuY29tL1xuQ29weXJpZ2h0IDIwMjQgZmVub3BpeFxuXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0gTGljZW5zZSBJbmZvcm1hdGlvbiAtLS0tLS0tLS0tLS0tLS0tLS0tLVxuVGhlIHNvZnR3YXJlIGluIENhbnZhc0pTIEFuZ3VsYXIgU3RvY2tDaGFydCBpcyBmcmVlIGFuZCBvcGVuLXNvdXJjZS4gQnV0LCBDYW52YXNKUyBBbmd1bGFyIFN0b2NrQ2hhcnQgcmVsaWVzIG9uIENhbnZhc0pTIFN0b2NrQ2hhcnQgd2hpY2ggcmVxdWlyZXMgYSB2YWxpZCBDYW52YXNKUyBTdG9ja0NoYXJ0IGxpY2Vuc2UgZm9yIGNvbW1lcmNpYWwgdXNlLiBQbGVhc2UgcmVmZXIgdG8gdGhlIGZvbGxvd2luZyBsaW5rIGZvciBmdXJ0aGVyIGRldGFpbHMgaHR0cHM6Ly9jYW52YXNqcy5jb20vbGljZW5zZS9cblxuUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSDigJxTb2Z0d2FyZeKAnSksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG5UaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIOKAnEFTIElT4oCdLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuKi9cblxuLyp0c2xpbnQ6ZGlzYWJsZSovXG4vKmVzbGludC1kaXNhYmxlKi9cbi8qanNoaW50IGlnbm9yZTpzdGFydCovXG5pbXBvcnQgeyBDb21wb25lbnQsIEFmdGVyVmlld0luaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmRlY2xhcmUgdmFyIHJlcXVpcmU6IGFueTtcbmlmKHR5cGVvZiBkb2N1bWVudCA9PT0gJ29iamVjdCcgJiYgISFkb2N1bWVudCkge1xuXHQvL0B0cy1pZ25vcmVcblx0dmFyIENhbnZhc0pTID0gcmVxdWlyZSgnQGNhbnZhc2pzL3N0b2NrY2hhcnRzJyk7XG59XG5cbkBDb21wb25lbnQoe1xuXHRzZWxlY3RvcjogJ2NhbnZhc2pzLXN0b2NrY2hhcnQnLFxuXHR0ZW1wbGF0ZTogJzxkaXYgKm5nSWY9XCJpc0RPTVByZXNlbnRcIiBpZD1cInt7c3RvY2tDaGFydENvbnRhaW5lcklkfX1cIiBbbmdTdHlsZV09XCJzdHlsZXNcIj48L2Rpdj4nXG59KVxuXG5jbGFzcyBDYW52YXNKU1N0b2NrQ2hhcnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG5cdHN0YXRpYyBfY2pzU3RvY2tDaGFydENvbnRhaW5lcklkID0gMDtcblx0c3RvY2tDaGFydDogYW55O1xuXHRzdG9ja0NoYXJ0Q29udGFpbmVySWQ6IGFueTtcblx0cHJldlN0b2NrQ2hhcnRPcHRpb25zOiBhbnk7XG5cdHNob3VsZFVwZGF0ZUNoYXJ0ID0gZmFsc2U7XG5cdGlzRE9NUHJlc2VudCA9IHR5cGVvZiBkb2N1bWVudCA9PT0gXCJvYmplY3RcIiAmJiAhIWRvY3VtZW50O1xuXG5cdEBJbnB1dCgpXG5cdG9wdGlvbnM6IGFueTtcblx0QElucHV0KClcblx0c3R5bGVzOiBhbnk7XG5cblx0QE91dHB1dCgpXG5cdHN0b2NrQ2hhcnRJbnN0YW5jZSA9IG5ldyBFdmVudEVtaXR0ZXI8b2JqZWN0PigpO1xuXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHRoaXMub3B0aW9ucyA9IHRoaXMub3B0aW9ucyA/IHRoaXMub3B0aW9ucyA6IHt9O1xuXHRcdHRoaXMuc3R5bGVzID0gdGhpcy5zdHlsZXMgPyB0aGlzLnN0eWxlcyA6IHsgd2lkdGg6IFwiMTAwJVwiLCBwb3NpdGlvbjogXCJyZWxhdGl2ZVwiIH07XG5cdFx0dGhpcy5zdHlsZXMuaGVpZ2h0ID0gdGhpcy5vcHRpb25zLmhlaWdodCA/IHRoaXMub3B0aW9ucy5oZWlnaHQgKyBcInB4XCIgOiBcIjQwMHB4XCI7XG5cblx0XHR0aGlzLnN0b2NrQ2hhcnRDb250YWluZXJJZCA9ICdjYW52YXNqcy1hbmd1bGFyLXN0b2NrY2hhcnQtY29udGFpbmVyLScgKyBDYW52YXNKU1N0b2NrQ2hhcnQuX2Nqc1N0b2NrQ2hhcnRDb250YWluZXJJZCsrO1xuXHR9XG5cblx0bmdEb0NoZWNrKCkge1xuXHRcdGlmKHRoaXMucHJldlN0b2NrQ2hhcnRPcHRpb25zICE9IHRoaXMub3B0aW9ucykge1xuXHRcdFx0dGhpcy5zaG91bGRVcGRhdGVDaGFydCA9IHRydWU7XG5cdFx0fVxuXHR9XG5cblx0bmdPbkNoYW5nZXMoKSB7XG5cdFx0Ly9VcGRhdGUgQ2hhcnQgT3B0aW9ucyAmIFJlbmRlclxuXHRcdGlmKHRoaXMuc2hvdWxkVXBkYXRlQ2hhcnQgJiYgdGhpcy5zdG9ja0NoYXJ0KSB7XG5cdFx0XHR0aGlzLnN0b2NrQ2hhcnQub3B0aW9ucyA9IHRoaXMub3B0aW9ucztcblx0XHRcdHRoaXMuc3RvY2tDaGFydC5yZW5kZXIoKTtcblx0XHRcdHRoaXMuc2hvdWxkVXBkYXRlQ2hhcnQgPSBmYWxzZTtcblx0XHRcdHRoaXMucHJldlN0b2NrQ2hhcnRPcHRpb25zID0gdGhpcy5vcHRpb25zO1xuXHRcdH1cblx0fVxuXG5cdG5nQWZ0ZXJWaWV3SW5pdCgpIHtcblx0XHRpZih0aGlzLmlzRE9NUHJlc2VudCkge1xuXHRcdFx0dGhpcy5zdG9ja0NoYXJ0ID0gbmV3IENhbnZhc0pTLlN0b2NrQ2hhcnQodGhpcy5zdG9ja0NoYXJ0Q29udGFpbmVySWQsIHRoaXMub3B0aW9ucyk7XG5cdFx0XHR0aGlzLnN0b2NrQ2hhcnQucmVuZGVyKCk7XG5cdFx0XHR0aGlzLnByZXZTdG9ja0NoYXJ0T3B0aW9ucyA9IHRoaXMub3B0aW9ucztcblx0XHRcdHRoaXMuc3RvY2tDaGFydEluc3RhbmNlLmVtaXQodGhpcy5zdG9ja0NoYXJ0KTtcblx0XHR9XG5cdH1cblxuXHRuZ09uRGVzdHJveSgpIHtcblx0XHRpZih0aGlzLnN0b2NrQ2hhcnQpXG5cdFx0XHR0aGlzLnN0b2NrQ2hhcnQuZGVzdHJveSgpO1xuXHR9XG59XG5cbmV4cG9ydCB7XG5cdENhbnZhc0pTU3RvY2tDaGFydCxcblx0Q2FudmFzSlNcbn07XG4vKnRzbGludDplbmFibGUqL1xuLyplc2xpbnQtZW5hYmxlKi9cbi8qanNoaW50IGlnbm9yZTplbmQqLyJdfQ==