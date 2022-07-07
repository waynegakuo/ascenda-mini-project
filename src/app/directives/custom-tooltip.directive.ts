import {Overlay, OverlayPositionBuilder, OverlayRef} from "@angular/cdk/overlay";
import {ComponentRef, Directive, ElementRef, HostListener, Input, TemplateRef} from "@angular/core";
import {ComponentPortal} from "@angular/cdk/portal";
import {CustomTooltipComponent} from "../shared/components/custom-tooltip/custom-tooltip.component";

@Directive({
  selector: '[customTooltip]'
})
export class CustomTooltipDirective {

  @Input() showToolTip: boolean = true;

  @Input(`customTooltip`) text!: string;

  @Input() contentTemplate!: TemplateRef<any>;

  private _overlayRef!: OverlayRef;

  constructor(private _overlay: Overlay,
              private _overlayPositionBuilder: OverlayPositionBuilder,
              private _elementRef: ElementRef) { }

  ngOnInit() {

    if (!this.showToolTip) {
      return;
    }

    const positionStrategy = this._overlayPositionBuilder
      .flexibleConnectedTo(this._elementRef)
      .withPositions([{
        originX: 'center',
        originY: 'bottom',
        overlayX: 'center',
        overlayY: 'top',
        offsetY: 5,
      }]);

    this._overlayRef = this._overlay.create({ positionStrategy});

  }

  @HostListener('mouseenter')
  show() {
    if (this._overlayRef && !this._overlayRef.hasAttached()) {
      const tooltipRef: ComponentRef<CustomTooltipComponent> = this._overlayRef.attach(new ComponentPortal(CustomTooltipComponent));
      tooltipRef.instance.text = this.text;
      tooltipRef.instance.contentTemplate = this.contentTemplate;
    }
  }

  @HostListener('mouseleave')
  hide() {
    this._closeToolTip();
  }

  ngOnDestroy() {
    this._closeToolTip();
  }

  private _closeToolTip() {
    if (this._overlayRef) {
      this._overlayRef.detach();
    }
  }

}
