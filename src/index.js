import React from 'react';
import ReactDOM from 'react-dom';
import 'babel-polyfill';
import App from './App';
import {AccordionDemo} from './showcase/accordion/AccordionDemo';
import {AutoCompleteDemo} from './showcase/autocomplete/AutoCompleteDemo';
import {ButtonDemo} from './showcase/button/ButtonDemo';
import {SplitButtonDemo} from './showcase/splitbutton/SplitButtonDemo';
import {CheckboxDemo} from './showcase/checkbox/CheckboxDemo';
import {ChipsDemo} from './showcase/chips/ChipsDemo';
import {DialogDemo} from './showcase/dialog/DialogDemo';
import {DropdownDemo} from './showcase/dropdown/DropdownDemo';
import {FieldsetDemo} from './showcase/fieldset/FieldsetDemo';
import {FileUploadDemo} from './showcase/fileupload/FileUploadDemo';
import {GMapDemo} from './showcase/gmap/GMapDemo';
import {GridDemo} from './showcase/grid/GridDemo';
import {GrowlDemo} from './showcase/growl/GrowlDemo';
import {InputTextDemo} from './showcase/inputtext/InputTextDemo';
import {InputTextareaDemo} from './showcase/inputtextarea/InputTextareaDemo';
import {ListBoxDemo} from './showcase/listbox/ListBoxDemo';
import {MessagesDemo} from './showcase/messages/MessagesDemo';
import {MultiSelectDemo} from './showcase/multiselect/MultiSelectDemo';
import {OverlayPanelDemo} from './showcase/overlaypanel/OverlayPanelDemo';
import {PanelDemo} from './showcase/panel/PanelDemo';
import {ProgressBarDemo} from './showcase/progressbar/ProgressBarDemo';
import {RadioButtonDemo} from './showcase/radiobutton/RadioButtonDemo';
import {TabViewDemo} from './showcase/tabview/TabViewDemo';
import {ToggleButtonDemo} from './showcase/togglebutton/ToggleButtonDemo';
import {TriStateCheckboxDemo} from './showcase/tristatecheckbox/TriStateCheckboxDemo';
import {SelectButtonDemo} from './showcase/selectbutton/SelectButtonDemo';
import {InputSwitchDemo} from './showcase/inputswitch/InputSwitchDemo';
import {SliderDemo} from './showcase/slider/SliderDemo';
import {SpinnerDemo} from './showcase/spinner/SpinnerDemo';
import {InputMaskDemo} from './showcase/inputmask/InputMaskDemo';
import {CalendarDemo} from './showcase/calendar/CalendarDemo';
import {ChartDemo} from './showcase/chart/ChartDemo';
import {PieChartDemo} from './showcase/chart/PieChartDemo';
import {BarChartDemo} from './showcase/chart/BarChartDemo';
import {LineChartDemo} from './showcase/chart/LineChartDemo';
import {DoughnutChartDemo} from './showcase/chart/DoughnutChartDemo';
import {RadarChartDemo} from './showcase/chart/RadarChartDemo';
import {PolarAreaChartDemo} from './showcase/chart/PolarAreaChartDemo';
import {PaginatorDemo} from './showcase/paginator/PaginatorDemo';
import {DataListDemo} from './showcase/datalist/DataListDemo';
import {DataGridDemo} from './showcase/datagrid/DataGridDemo';
import {DataTableDemo} from './showcase/datatable/DataTableDemo';
import {DataTableLazyDemo} from './showcase/datatable/DataTableLazyDemo';
import {DataTableExportDemo} from './showcase/datatable/DataTableExportDemo';
import {DataTableCrudDemo} from './showcase/datatable/DataTableCrudDemo';
import {DataTableTemplatingDemo} from './showcase/datatable/DataTableTemplatingDemo';
import {DataTablePaginatorDemo} from './showcase/datatable/DataTablePaginatorDemo';
import {DataTableSortDemo} from './showcase/datatable/DataTableSortDemo';
import {DataTableFilterDemo} from './showcase/datatable/DataTableFilterDemo';
import {DataTableColTogglerDemo} from './showcase/datatable/DataTableColTogglerDemo';
import {DataTableScrollDemo} from './showcase/datatable/DataTableScrollDemo';
import {DataTableSelectionDemo} from './showcase/datatable/DataTableSelectionDemo';
import {DataTableColGroupDemo} from './showcase/datatable/DataTableColGroupDemo';
import {DataTableRowExpansionDemo} from './showcase/datatable/DataTableRowExpansionDemo';
import {DataTableColResizeDemo} from './showcase/datatable/DataTableColResizeDemo';
import {DataTableColReorderDemo} from './showcase/datatable/DataTableColReorderDemo';
import {DataTableContextMenuDemo} from './showcase/datatable/DataTableContextMenuDemo';
import {DataTableResponsiveDemo} from './showcase/datatable/DataTableResponsiveDemo';
import {OrderListDemo} from './showcase/orderlist/OrderListDemo';
import {PickListDemo} from './showcase/picklist/PickListDemo';
import {ScheduleDemo} from './showcase/schedule/ScheduleDemo';
import {TreeDemo} from './showcase/tree/TreeDemo';
import {TreeTableDemo} from './showcase/treetable/TreeTableDemo';
import {CaptchaDemo} from './showcase/captcha/CaptchaDemo';
import {ColorPickerDemo} from './showcase/colorpicker/ColorPickerDemo';
import {PasswordDemo} from './showcase/password/PasswordDemo';
import {SetupPage} from './showcase/setup/SetupPage';
import {RatingDemo} from './showcase/rating/RatingDemo';
import {ToolbarDemo} from './showcase/toolbar/ToolbarDemo';
import {LightboxDemo} from './showcase/lightbox/LightboxDemo';
import {DataScrollerDemo} from './showcase/datascroller/DataScrollerDemo';
import {DataScrollerInlineDemo} from './showcase/datascroller/DataScrollerInlineDemo';
import {DataScrollerLoaderDemo} from './showcase/datascroller/DataScrollerLoaderDemo';
import {DataScrollerInfiniteDemo} from './showcase/datascroller/DataScrollerInfiniteDemo';
import {MenuDemo} from './showcase/menu/MenuDemo';
import {TabMenuDemo} from './showcase/tabmenu/TabMenuDemo';
import {BreadcrumbDemo} from './showcase/breadcrumb/BreadcrumbDemo';
import {TieredMenuDemo} from './showcase/tieredmenu/TieredMenuDemo';
import {MenubarDemo} from './showcase/menubar/MenubarDemo';
import {ContextMenuDemo} from './showcase/contextmenu/ContextMenuDemo';
import {PanelMenuDemo} from './showcase/panelmenu/PanelMenuDemo';
import {StepsDemo} from './showcase/steps/StepsDemo';
import {MegaMenuDemo} from './showcase/megamenu/MegaMenuDemo';
import {SlideMenuDemo} from './showcase/slidemenu/SlideMenuDemo';
import {OrganizationChartDemo} from './showcase/organizationchart/OrganizationChartDemo';
import {ThemingPage} from "./showcase/theming/ThemingPage"
import {InputGroupDemo} from "./showcase/inputgroup/InputGroupDemo";
import {EditorDemo} from "./showcase/editor/EditorDemo";
import {TooltipDemo} from "./showcase/tooltip/TooltipDemo";
import {Route,HashRouter,Switch} from 'react-router-dom';
import {MenuModelDemo} from "./showcase/menumodel/MenuModelDemo";
import {SidebarDemo} from "./showcase/sidebar/SidebarDemo";

ReactDOM.render(
    <HashRouter>
        <Switch>
            <Route exact path="/" component={App}/>
            <App>
                <Route path="/accordion" component={AccordionDemo} />
                <Route path="/autocomplete" component={AutoCompleteDemo} />
                <Route path="/button" component={ButtonDemo} />
                <Route path="/checkbox" component={CheckboxDemo} />
                <Route path="/chips" component={ChipsDemo} />
                <Route path="/dialog" component={DialogDemo} />
                <Route path="/dropdown" component={DropdownDemo} />
                <Route path="/grid" component={GridDemo} />
                <Route path="/growl" component={GrowlDemo} />
                <Route path="/fieldset" component={FieldsetDemo} />
                <Route path="/fileupload" component={FileUploadDemo} />
                <Route path="/inputtext" component={InputTextDemo} />
                <Route path="/inputtextarea" component={InputTextareaDemo} />
                <Route path="/listbox" component={ListBoxDemo} />
                <Route path="/messages" component={MessagesDemo} />
                <Route path="/multiselect" component={MultiSelectDemo} />
                <Route path="/overlaypanel" component={OverlayPanelDemo} />
                <Route path="/panel" component={PanelDemo} />
                <Route path="/progressbar" component={ProgressBarDemo} />
                <Route path="/radiobutton" component={RadioButtonDemo} />
                <Route path="/tabview" component={TabViewDemo} />
                <Route path="/togglebutton" component={ToggleButtonDemo} />
                <Route path="/tristatecheckbox" component={TriStateCheckboxDemo} />
                <Route path="/selectbutton" component={SelectButtonDemo} />
                <Route path="/inputswitch" component={InputSwitchDemo} />
                <Route path="/inputmask" component={InputMaskDemo} />
                <Route path="/slider" component={SliderDemo} />
                <Route path="/spinner" component={SpinnerDemo} />
                <Route path="/calendar" component={CalendarDemo} />
                <Route path="/chartdemo" component={ChartDemo} />
                <Route path="/piechart" component={PieChartDemo} />
                <Route path="/doughnutchart" component={DoughnutChartDemo} />
                <Route path="/linechart" component={LineChartDemo} />
                <Route path="/barchart" component={BarChartDemo} />
                <Route path="/polarareachart" component={PolarAreaChartDemo} />
                <Route path="/radarchart" component={RadarChartDemo} />
                <Route path="/paginator" component={PaginatorDemo} />
                <Route path="/datalist" component={DataListDemo} />
                <Route path="/datagrid" component={DataGridDemo} />
                <Route exact path="/datatable" component={DataTableDemo} />
                <Route path="/datatable/templating" component={DataTableTemplatingDemo} />
                <Route path="/datatable/paginator" component={DataTablePaginatorDemo} />
                <Route path="/datatable/sort" component={DataTableSortDemo} />
                <Route path="/datatable/filter" component={DataTableFilterDemo} />
                <Route path="/datatable/scroll" component={DataTableScrollDemo} />
                <Route path="/datatable/lazy" component={DataTableLazyDemo} />
                <Route path="/datatable/selection" component={DataTableSelectionDemo} />
                <Route path="/datatable/colgroup" component={DataTableColGroupDemo} />
                <Route path="/datatable/contextmenu" component={DataTableContextMenuDemo} />
                <Route path="/datatable/coltoggle" component={DataTableColTogglerDemo} />
                <Route path="/datatable/rowexpand" component={DataTableRowExpansionDemo} />
                <Route path="/datatable/responsive" component={DataTableResponsiveDemo} />
                <Route path="/datatable/colresize" component={DataTableColResizeDemo} />
                <Route path="/datatable/colreorder" component={DataTableColReorderDemo} />
                <Route path="/datatable/export" component={DataTableExportDemo} />
                <Route path="/datatable/crud" component={DataTableCrudDemo} />
                <Route path="/orderlist" component={OrderListDemo} />
                <Route path="/picklist" component={PickListDemo} />
                <Route path="/schedule" component={ScheduleDemo} />
                <Route path="/tree" component={TreeDemo} />
                <Route path="/treetable" component={TreeTableDemo} />
                <Route path="/captcha" component={CaptchaDemo} />
                <Route path="/colorpicker" component={ColorPickerDemo} />
                <Route path="/password" component={PasswordDemo} />
                <Route path="/toolbar" component={ToolbarDemo} />
                <Route path="/lightbox" component={LightboxDemo} />
                <Route path="/rating" component={RatingDemo} />
                <Route exact path="/datascroller" component={DataScrollerDemo} />
                <Route path="/datascroller/inline" component={DataScrollerInlineDemo} />
                <Route path="/datascroller/loader" component={DataScrollerLoaderDemo} />
                <Route path="/datascroller/infinite" component={DataScrollerInfiniteDemo} />
                <Route path="/menumodel" component={MenuModelDemo} />
                <Route path="/menu" component={MenuDemo} />
                <Route path="/tabmenu" component={TabMenuDemo} />
                <Route path="/breadcrumb" component={BreadcrumbDemo} />
                <Route path="/tieredmenu" component={TieredMenuDemo} />
                <Route path="/menubar" component={MenubarDemo} />
                <Route path="/contextmenu" component={ContextMenuDemo} />
                <Route path="/panelmenu" component={PanelMenuDemo} />
                <Route path="/slidemenu" component={SlideMenuDemo} />
                <Route path="/steps" component={StepsDemo} />
                <Route path="/megamenu" component={MegaMenuDemo} />
                <Route path="/setup" component={SetupPage} />
                <Route path="/splitbutton" component={SplitButtonDemo} />
                <Route path="/organizationchart" component={OrganizationChartDemo} />
                <Route path="/theming" component={ThemingPage} />
                <Route path="/inputgroup" component={InputGroupDemo} />
                <Route path="/editor" component={EditorDemo} />
                <Route path="/tooltip" component={TooltipDemo} />
                <Route path="/sidebar" component={SidebarDemo} />
                <Route path="/gmap" component={GMapDemo} />
            </App>
        </Switch>
    </HashRouter>,
    document.getElementById('root')
);
