"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const core_1 = require("@angular-devkit/core");
const config_1 = require("@schematics/angular/utility/config");
const ast_utils_1 = require("@schematics/angular/utility/ast-utils");
const change_1 = require("@schematics/angular/utility/change");
const schematics_2 = require("@angular/cdk/schematics");
const ts = require("typescript");
function default_1(options) {
    return schematics_1.chain([
        addMdbProModuleImport(options),
        addMdbSpinngPreloaderProvider(options),
        addAngularAnimationsModule(options),
        addStylesAndScriptsToAngularJson(options),
        addRobotoFontToIndexHtml(),
        addAdditionalStylesImports(options),
    ]);
}
exports.default = default_1;
function addMdbProModuleImport(options) {
    return (tree) => {
        const workspace = config_1.getWorkspace(tree);
        const project = schematics_2.getProjectFromWorkspace(workspace, options.project);
        const mdbProModuleName = 'MDBBootstrapModulesPro.forRoot()';
        const mdbProModulePath = 'ng-uikit-pro-standard';
        schematics_2.addModuleImportToRootModule(tree, mdbProModuleName, mdbProModulePath, project);
        return tree;
    };
}
function addMdbSpinngPreloaderProvider(options) {
    return (tree) => {
        const workspace = config_1.getWorkspace(tree);
        const project = schematics_2.getProjectFromWorkspace(workspace, options.project);
        const appModulePath = schematics_2.getAppModulePath(tree, schematics_2.getProjectMainFile(project));
        const text = tree.read(appModulePath);
        if (!text) {
            throw new schematics_1.SchematicsException(`File ${appModulePath} does not exist.`);
        }
        const sourceText = text.toString('utf-8');
        const source = ts.createSourceFile(appModulePath, sourceText, ts.ScriptTarget.Latest, true);
        const providerPath = 'ng-uikit-pro-standard';
        const classifiedName = core_1.strings.classify('MDBSpinningPreloader');
        const providersChanges = ast_utils_1.addProviderToModule(source, appModulePath, classifiedName, providerPath);
        const providersRecorder = tree.beginUpdate(appModulePath);
        for (const change of providersChanges) {
            if (change instanceof change_1.InsertChange) {
                providersRecorder.insertLeft(change.pos, change.toAdd);
            }
        }
        tree.commitUpdate(providersRecorder);
        return tree;
    };
}
function addAngularAnimationsModule(options) {
    return (tree, context) => {
        const workspace = config_1.getWorkspace(tree);
        const project = schematics_2.getProjectFromWorkspace(workspace, options.project);
        const appModulePath = schematics_2.getAppModulePath(tree, schematics_2.getProjectMainFile(project));
        const browserAnimationModule = 'BrowserAnimationsModule';
        const animationsModulePath = '@angular/platform-browser/animations';
        const noopAnimationModule = 'NoopAnimationsModule';
        if (options.animations) {
            if (schematics_2.hasNgModuleImport(tree, appModulePath, noopAnimationModule)) {
                context.logger.error(`Could not add ${browserAnimationModule} because ${noopAnimationModule} is already added`);
                return;
            }
            schematics_2.addModuleImportToRootModule(tree, browserAnimationModule, animationsModulePath, project);
        }
        else if (!schematics_2.hasNgModuleImport(tree, appModulePath, noopAnimationModule)) {
            schematics_2.addModuleImportToRootModule(tree, noopAnimationModule, animationsModulePath, project);
        }
        return tree;
    };
}
function addRobotoFontToIndexHtml() {
    return (tree, context) => {
        const fontUrl = 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,600&display=swap';
        const workspace = config_1.getWorkspace(tree);
        const project = schematics_2.getProjectFromWorkspace(workspace);
        const projectIndexFiles = schematics_2.getProjectIndexFiles(project);
        const logger = context.logger;
        if (!projectIndexFiles.length) {
            logger.error('Index HTML not found');
            logger.info('Add roboto font manually');
            return;
        }
        projectIndexFiles.forEach((indexFile) => {
            schematics_2.appendHtmlElementToHead(tree, indexFile, `<link href="${fontUrl}" rel="stylesheet">`);
        });
        return tree;
    };
}
function addStylesAndScriptsToAngularJson(options) {
    return (tree, context) => {
        const logger = context.logger;
        const mainStyles = [
            {
                name: 'bootstrap',
                path: './node_modules/ng-uikit-pro-standard/assets/scss/bootstrap/bootstrap.scss',
            },
            { name: 'mdb', path: './node_modules/ng-uikit-pro-standard/assets/scss/mdb.scss' },
        ];
        const additionalStyles = [
            {
                name: 'fontawesome',
                path: './node_modules/@fortawesome/fontawesome-free/scss/fontawesome.scss',
            },
            {
                name: 'fontawesome-solid',
                path: './node_modules/@fortawesome/fontawesome-free/scss/solid.scss',
            },
            {
                name: 'fontawesome-regular',
                path: './node_modules/@fortawesome/fontawesome-free/scss/regular.scss',
            },
            {
                name: 'fontawesome-brand',
                path: './node_modules/@fortawesome/fontawesome-free/scss/brands.scss',
            },
            { name: 'animate.css', path: './node_modules/animate.css/animate.css' },
        ];
        const allStyles = options.externalDependencies
            ? [...mainStyles, ...additionalStyles]
            : mainStyles;
        const additionalScripts = [
            { name: 'chart.js', path: './node_modules/chart.js/dist/Chart.js' },
            { name: 'hammerjs', path: './node_modules/hammerjs/hammer.min.js' },
        ];
        const angularJsonFile = tree.read('angular.json');
        if (angularJsonFile) {
            const angularJsonFileObject = JSON.parse(angularJsonFile.toString('utf-8'));
            const project = options.project
                ? options.project
                : Object.keys(angularJsonFileObject['projects'])[0];
            const projectObject = angularJsonFileObject.projects[project];
            const styles = projectObject.architect.build.options.styles;
            const scripts = projectObject.architect.build.options.scripts;
            allStyles.forEach(style => {
                styles.unshift(style.path);
            });
            additionalScripts.forEach(script => {
                scripts.push(script.path);
            });
            tree.overwrite('angular.json', JSON.stringify(angularJsonFileObject, null, 2));
        }
        else {
            logger.error('Failed to add scripts or styles to angular.json');
        }
        return tree;
    };
}
function addAdditionalStylesImports(options) {
    return (tree) => {
        const workspace = config_1.getWorkspace(tree);
        const project = schematics_2.getProjectFromWorkspace(workspace, options.project);
        const stylesFile = schematics_2.getProjectStyleFile(project, 'scss');
        const sectionStyles = `
    @import '~ng-uikit-pro-standard/assets/scss/core/colors';
    @import '~ng-uikit-pro-standard/assets/scss/core/variables';
    @import '~ng-uikit-pro-standard/assets/scss/core/variables-pro';

    @import '~ng-uikit-pro-standard/assets/scss/sections-pro/_contacts-pro.scss';
    @import '~ng-uikit-pro-standard/assets/scss/sections-pro/_magazine-pro.scss';
    @import '~ng-uikit-pro-standard/assets/scss/sections-pro/_pricing-pro.scss';
    @import '~ng-uikit-pro-standard/assets/scss/sections-pro/_social-pro.scss';
    @import '~ng-uikit-pro-standard/assets/scss/sections-pro/_team-pro.scss';
    @import '~ng-uikit-pro-standard/assets/scss/sections-pro/_templates-pro.scss';
    @import '~ng-uikit-pro-standard/assets/scss/sections-pro/_testimonials-pro.scss';
    @import '~ng-uikit-pro-standard/assets/scss/addons-pro/_blog-pro.scss';
    @import '~ng-uikit-pro-standard/assets/scss/addons-pro/_chat-pro.scss';
    @import '~ng-uikit-pro-standard/assets/scss/addons-pro/_ecommerce-pro.scss';
    @import '~ng-uikit-pro-standard/assets/scss/addons-pro/_steppers-pro.scss';
    @import '~ng-uikit-pro-standard/assets/scss/addons-pro/_timeline-pro.scss';
    @import '~ng-uikit-pro-standard/assets/scss/addons-pro/_timelines-pro.scss';
    `;
        if (options.additionalStyles && stylesFile) {
            const recorder = tree.beginUpdate(stylesFile).insertLeft(0, sectionStyles);
            tree.commitUpdate(recorder);
        }
        else if (options.additionalStyles && !stylesFile) {
            throw new schematics_1.SchematicsException('No root scss file found in the project.');
        }
    };
}
//# sourceMappingURL=mdb-setup.js.map