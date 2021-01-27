import { __assign } from "tslib";
export function shift(data) {
    var _a, _b;
    var placement = data.placement;
    var basePlacement = placement.split(' ')[0];
    var shiftvariation = placement.split(' ')[1];
    if (shiftvariation) {
        var _c = data.offsets, host = _c.host, target = _c.target;
        var isVertical = ['bottom', 'top'].indexOf(basePlacement) !== -1;
        var side = isVertical ? 'left' : 'top';
        var measurement = isVertical ? 'width' : 'height';
        var shiftOffsets = {
            left: (_a = {}, _a[side] = host[side], _a),
            right: (_b = {},
                _b[side] = host[side] + host[measurement] - host[measurement],
                _b)
        };
        data.offsets.target = __assign(__assign({}, target), shiftOffsets[shiftvariation]);
    }
    return data;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hpZnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy11aWtpdC1wcm8tc3RhbmRhcmQvIiwic291cmNlcyI6WyJsaWIvZnJlZS91dGlscy9wb3NpdGlvbmluZy9tb2RpZmllcnMvc2hpZnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUVBLE1BQU0sVUFBVSxLQUFLLENBQUMsSUFBVTs7SUFDOUIsSUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUNqQyxJQUFNLGFBQWEsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzlDLElBQU0sY0FBYyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFL0MsSUFBSSxjQUFjLEVBQUU7UUFDWixJQUFBLGlCQUErQixFQUE3QixjQUFJLEVBQUUsa0JBQXVCLENBQUM7UUFDdEMsSUFBTSxVQUFVLEdBQUcsQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ25FLElBQU0sSUFBSSxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDekMsSUFBTSxXQUFXLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztRQUVwRCxJQUFNLFlBQVksR0FBRztZQUNuQixJQUFJLFlBQUksR0FBQyxJQUFJLElBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFFO1lBQzVCLEtBQUs7Z0JBQ0gsR0FBQyxJQUFJLElBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO21CQUMzRDtTQUNGLENBQUM7UUFFRixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0seUJBQVEsTUFBTSxHQUFNLFlBQW9CLENBQUMsY0FBYyxDQUFDLENBQUUsQ0FBQztLQUMvRTtJQUVELE9BQU8sSUFBSSxDQUFDO0FBQ2QsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERhdGEgfSBmcm9tICcuLi9tb2RlbHMvaW5kZXgnO1xuXG5leHBvcnQgZnVuY3Rpb24gc2hpZnQoZGF0YTogRGF0YSk6IERhdGEge1xuICBjb25zdCBwbGFjZW1lbnQgPSBkYXRhLnBsYWNlbWVudDtcbiAgY29uc3QgYmFzZVBsYWNlbWVudCA9IHBsYWNlbWVudC5zcGxpdCgnICcpWzBdO1xuICBjb25zdCBzaGlmdHZhcmlhdGlvbiA9IHBsYWNlbWVudC5zcGxpdCgnICcpWzFdO1xuXG4gIGlmIChzaGlmdHZhcmlhdGlvbikge1xuICAgIGNvbnN0IHsgaG9zdCwgdGFyZ2V0IH0gPSBkYXRhLm9mZnNldHM7XG4gICAgY29uc3QgaXNWZXJ0aWNhbCA9IFsnYm90dG9tJywgJ3RvcCddLmluZGV4T2YoYmFzZVBsYWNlbWVudCkgIT09IC0xO1xuICAgIGNvbnN0IHNpZGUgPSBpc1ZlcnRpY2FsID8gJ2xlZnQnIDogJ3RvcCc7XG4gICAgY29uc3QgbWVhc3VyZW1lbnQgPSBpc1ZlcnRpY2FsID8gJ3dpZHRoJyA6ICdoZWlnaHQnO1xuXG4gICAgY29uc3Qgc2hpZnRPZmZzZXRzID0ge1xuICAgICAgbGVmdDogeyBbc2lkZV06IGhvc3Rbc2lkZV0gfSxcbiAgICAgIHJpZ2h0OiB7XG4gICAgICAgIFtzaWRlXTogaG9zdFtzaWRlXSArIGhvc3RbbWVhc3VyZW1lbnRdIC0gaG9zdFttZWFzdXJlbWVudF1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgZGF0YS5vZmZzZXRzLnRhcmdldCA9IHsgLi4udGFyZ2V0LCAuLi4oc2hpZnRPZmZzZXRzIGFzIGFueSlbc2hpZnR2YXJpYXRpb25dIH07XG4gIH1cblxuICByZXR1cm4gZGF0YTtcbn1cbiJdfQ==