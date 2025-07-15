/*
CanvasJS Angular Chart- https://canvasjs.com/
Copyright 2024 fenopix

--------------------- License Information --------------------
The software in CanvasJS Angular Chart is free and open-source. But, CanvasJS Angular Chart relies on CanvasJS Chart which requires a valid CanvasJS Chart license for commercial use. Please refer to the following link for further details https://canvasjs.com/license/

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
class CanvasJSChart {
    constructor() {
        this.shouldUpdateChart = false;
        this.isDOMPresent = typeof document === "object" && !!document;
        this.chartInstance = new EventEmitter();
        this.options = this.options ? this.options : {};
        this.styles = this.styles ? this.styles : { width: "100%", position: "relative" };
        this.styles.height = this.options.height ? this.options.height + "px" : "400px";
        this.chartContainerId = 'canvasjs-angular-chart-container-' + CanvasJSChart._cjsChartContainerId++;
    }
    ngDoCheck() {
        if (this.prevChartOptions != this.options) {
            this.shouldUpdateChart = true;
        }
    }
    ngOnChanges() {
        //Update Chart Options & Render
        if (this.shouldUpdateChart && this.chart) {
            this.chart.options = this.options;
            this.chart.render();
            this.shouldUpdateChart = false;
            this.prevChartOptions = this.options;
        }
    }
    ngAfterViewInit() {
        if (this.isDOMPresent) {
            this.chart = new CanvasJS.Chart(this.chartContainerId, this.options);
            this.chart.render();
            this.prevChartOptions = this.options;
            this.chartInstance.emit(this.chart);
        }
    }
    ngOnDestroy() {
        if (this.chart)
            this.chart.destroy();
    }
}
CanvasJSChart._cjsChartContainerId = 0;
CanvasJSChart.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: CanvasJSChart, deps: [], target: i0.ɵɵFactoryTarget.Component });
CanvasJSChart.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.17", type: CanvasJSChart, selector: "canvasjs-chart", inputs: { options: "options", styles: "styles" }, outputs: { chartInstance: "chartInstance" }, usesOnChanges: true, ngImport: i0, template: '<div *ngIf="isDOMPresent" id="{{chartContainerId}}" [ngStyle]="styles"></div>', isInline: true, directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }] });
i0.ɵɵngDeclareClassMetadata({
    minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: CanvasJSChart, decorators: [{
        type: Component,
        args: [{
            selector: 'canvasjs-chart',
            template: '<div *ngIf="isDOMPresent" id="{{chartContainerId}}" [ngStyle]="styles"></div>'
        }]
    }], ctorParameters: function () { return []; }, propDecorators: {
        options: [{
            type: Input
        }], styles: [{
            type: Input
        }], chartInstance: [{
            type: Output
        }]
    }
});
export { CanvasJSChart };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FudmFzanMtYW5ndWxhci1jaGFydHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvY2FudmFzanMtYW5ndWxhci1zdG9ja2NoYXJ0cy9zcmMvbGliL2NhbnZhc2pzLWFuZ3VsYXItY2hhcnRzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7OztFQWFFO0FBQ0Ysa0JBQWtCO0FBQ2xCLGtCQUFrQjtBQUNsQix1QkFBdUI7QUFDdkIsT0FBTyxFQUFFLFNBQVMsRUFBdUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7OztBQUU1RyxJQUFHLE9BQU8sUUFBUSxLQUFLLFFBQVEsSUFBSSxDQUFDLENBQUMsUUFBUSxFQUFFO0lBQzlDLFlBQVk7SUFDWixJQUFJLFFBQVEsR0FBRyxPQUFPLENBQUMsdUJBQXVCLENBQUMsQ0FBQztDQUNoRDtBQUVELE1BS00sYUFBYTtJQWdCbEI7UUFYQSxzQkFBaUIsR0FBRyxLQUFLLENBQUM7UUFDMUIsaUJBQVksR0FBRyxPQUFPLFFBQVEsS0FBSyxRQUFRLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQztRQVExRCxrQkFBYSxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7UUFHMUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDaEQsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxDQUFDO1FBQ2xGLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztRQUVoRixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsbUNBQW1DLEdBQUcsYUFBYSxDQUFDLG9CQUFvQixFQUFFLENBQUM7SUFDcEcsQ0FBQztJQUVELFNBQVM7UUFDUixJQUFHLElBQUksQ0FBQyxnQkFBZ0IsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ3pDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUM7U0FDOUI7SUFDRixDQUFDO0lBRUQsV0FBVztRQUNWLCtCQUErQjtRQUMvQixJQUFHLElBQUksQ0FBQyxpQkFBaUIsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ3hDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDbEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNwQixJQUFJLENBQUMsaUJBQWlCLEdBQUcsS0FBSyxDQUFDO1lBQy9CLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1NBQ3JDO0lBQ0YsQ0FBQztJQUVELGVBQWU7UUFDZCxJQUFHLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDckIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNyRSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ3BCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ3JDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNwQztJQUNGLENBQUM7SUFFRCxXQUFXO1FBQ1YsSUFBRyxJQUFJLENBQUMsS0FBSztZQUNaLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDdkIsQ0FBQzs7QUFuRE0sa0NBQW9CLEdBQUcsQ0FBQyxDQUFDOzJHQUQzQixhQUFhOytGQUFiLGFBQWEsMEtBSFIsK0VBQStFOzRGQUdwRixhQUFhO2tCQUxsQixTQUFTO21CQUFDO29CQUNWLFFBQVEsRUFBRSxnQkFBZ0I7b0JBQzFCLFFBQVEsRUFBRSwrRUFBK0U7aUJBQ3pGOzBFQVdBLE9BQU87c0JBRE4sS0FBSztnQkFHTixNQUFNO3NCQURMLEtBQUs7Z0JBSU4sYUFBYTtzQkFEWixNQUFNOztBQTBDUixPQUFPLEVBQ04sYUFBYSxFQUNiLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxyXG5DYW52YXNKUyBBbmd1bGFyIENoYXJ0LSBodHRwczovL2NhbnZhc2pzLmNvbS9cclxuQ29weXJpZ2h0IDIwMjQgZmVub3BpeFxyXG5cclxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tIExpY2Vuc2UgSW5mb3JtYXRpb24gLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuVGhlIHNvZnR3YXJlIGluIENhbnZhc0pTIEFuZ3VsYXIgQ2hhcnQgaXMgZnJlZSBhbmQgb3Blbi1zb3VyY2UuIEJ1dCwgQ2FudmFzSlMgQW5ndWxhciBDaGFydCByZWxpZXMgb24gQ2FudmFzSlMgQ2hhcnQgd2hpY2ggcmVxdWlyZXMgYSB2YWxpZCBDYW52YXNKUyBDaGFydCBsaWNlbnNlIGZvciBjb21tZXJjaWFsIHVzZS4gUGxlYXNlIHJlZmVyIHRvIHRoZSBmb2xsb3dpbmcgbGluayBmb3IgZnVydGhlciBkZXRhaWxzIGh0dHBzOi8vY2FudmFzanMuY29tL2xpY2Vuc2UvXHJcblxyXG5QZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIOKAnFNvZnR3YXJl4oCdKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XHJcblxyXG5UaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cclxuXHJcblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCDigJxBUyBJU+KAnSwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXHJcblxyXG4qL1xyXG4vKnRzbGludDpkaXNhYmxlKi9cclxuLyplc2xpbnQtZGlzYWJsZSovXHJcbi8qanNoaW50IGlnbm9yZTpzdGFydCovXHJcbmltcG9ydCB7IENvbXBvbmVudCwgQWZ0ZXJWaWV3SW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5kZWNsYXJlIHZhciByZXF1aXJlOiBhbnk7XHJcbmlmKHR5cGVvZiBkb2N1bWVudCA9PT0gJ29iamVjdCcgJiYgISFkb2N1bWVudCkge1xyXG5cdC8vQHRzLWlnbm9yZVxyXG5cdHZhciBDYW52YXNKUyA9IHJlcXVpcmUoJ0BjYW52YXNqcy9zdG9ja2NoYXJ0cycpO1xyXG59XHJcblxyXG5AQ29tcG9uZW50KHtcclxuXHRzZWxlY3RvcjogJ2NhbnZhc2pzLWNoYXJ0JyxcclxuXHR0ZW1wbGF0ZTogJzxkaXYgKm5nSWY9XCJpc0RPTVByZXNlbnRcIiBpZD1cInt7Y2hhcnRDb250YWluZXJJZH19XCIgW25nU3R5bGVdPVwic3R5bGVzXCI+PC9kaXY+J1xyXG59KVxyXG5cclxuY2xhc3MgQ2FudmFzSlNDaGFydCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcclxuXHRzdGF0aWMgX2Nqc0NoYXJ0Q29udGFpbmVySWQgPSAwO1xyXG5cdGNoYXJ0OiBhbnk7XHJcblx0Y2hhcnRDb250YWluZXJJZDogYW55O1xyXG5cdHByZXZDaGFydE9wdGlvbnM6IGFueTtcclxuXHRzaG91bGRVcGRhdGVDaGFydCA9IGZhbHNlO1xyXG5cdGlzRE9NUHJlc2VudCA9IHR5cGVvZiBkb2N1bWVudCA9PT0gXCJvYmplY3RcIiAmJiAhIWRvY3VtZW50O1xyXG5cclxuXHRASW5wdXQoKVxyXG5cdG9wdGlvbnM6IGFueTtcclxuXHRASW5wdXQoKVxyXG5cdHN0eWxlczogYW55O1xyXG5cclxuXHRAT3V0cHV0KClcclxuXHRjaGFydEluc3RhbmNlID0gbmV3IEV2ZW50RW1pdHRlcjxvYmplY3Q+KCk7XHJcblxyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0dGhpcy5vcHRpb25zID0gdGhpcy5vcHRpb25zID8gdGhpcy5vcHRpb25zIDoge307XHJcblx0XHR0aGlzLnN0eWxlcyA9IHRoaXMuc3R5bGVzID8gdGhpcy5zdHlsZXMgOiB7IHdpZHRoOiBcIjEwMCVcIiwgcG9zaXRpb246IFwicmVsYXRpdmVcIiB9O1xyXG5cdFx0dGhpcy5zdHlsZXMuaGVpZ2h0ID0gdGhpcy5vcHRpb25zLmhlaWdodCA/IHRoaXMub3B0aW9ucy5oZWlnaHQgKyBcInB4XCIgOiBcIjQwMHB4XCI7XHJcblxyXG5cdFx0dGhpcy5jaGFydENvbnRhaW5lcklkID0gJ2NhbnZhc2pzLWFuZ3VsYXItY2hhcnQtY29udGFpbmVyLScgKyBDYW52YXNKU0NoYXJ0Ll9janNDaGFydENvbnRhaW5lcklkKys7XHJcblx0fVxyXG5cclxuXHRuZ0RvQ2hlY2soKSB7XHJcblx0XHRpZih0aGlzLnByZXZDaGFydE9wdGlvbnMgIT0gdGhpcy5vcHRpb25zKSB7XHJcblx0XHRcdHRoaXMuc2hvdWxkVXBkYXRlQ2hhcnQgPSB0cnVlO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0bmdPbkNoYW5nZXMoKSB7XHJcblx0XHQvL1VwZGF0ZSBDaGFydCBPcHRpb25zICYgUmVuZGVyXHJcblx0XHRpZih0aGlzLnNob3VsZFVwZGF0ZUNoYXJ0ICYmIHRoaXMuY2hhcnQpIHtcclxuXHRcdFx0dGhpcy5jaGFydC5vcHRpb25zID0gdGhpcy5vcHRpb25zO1xyXG5cdFx0XHR0aGlzLmNoYXJ0LnJlbmRlcigpO1xyXG5cdFx0XHR0aGlzLnNob3VsZFVwZGF0ZUNoYXJ0ID0gZmFsc2U7XHJcblx0XHRcdHRoaXMucHJldkNoYXJ0T3B0aW9ucyA9IHRoaXMub3B0aW9ucztcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuXHRcdGlmKHRoaXMuaXNET01QcmVzZW50KSB7XHJcblx0XHRcdHRoaXMuY2hhcnQgPSBuZXcgQ2FudmFzSlMuQ2hhcnQodGhpcy5jaGFydENvbnRhaW5lcklkLCB0aGlzLm9wdGlvbnMpO1xyXG5cdFx0XHR0aGlzLmNoYXJ0LnJlbmRlcigpO1xyXG5cdFx0XHR0aGlzLnByZXZDaGFydE9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XHJcblx0XHRcdHRoaXMuY2hhcnRJbnN0YW5jZS5lbWl0KHRoaXMuY2hhcnQpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0bmdPbkRlc3Ryb3koKSB7XHJcblx0XHRpZih0aGlzLmNoYXJ0KVxyXG5cdFx0XHR0aGlzLmNoYXJ0LmRlc3Ryb3koKTtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCB7XHJcblx0Q2FudmFzSlNDaGFydFxyXG59O1xyXG4vKnRzbGludDplbmFibGUqL1xyXG4vKmVzbGludC1lbmFibGUqL1xyXG4vKmpzaGludCBpZ25vcmU6ZW5kKi8iXX0=