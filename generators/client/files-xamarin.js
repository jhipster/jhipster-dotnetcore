/**
 * Copyright 2013-2023 the original author or authors from the JHipster project.
 *
 * This file is part of the JHipster project, see https://www.jhipster.tech/
 * for more information.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const constants = require('../generator-dotnetcore-constants.cjs');

/* Constants use throughout */
const CLIENT_SRC_DIR = constants.CLIENT_SRC_DIR;
const CLIENT_TEST_DIR = constants.CLIENT_TEST_DIR;

/**
 * The default is to use a file path string. It implies use of the template method.
 * For any other config an object { file:.., method:.., template:.. } can be used
 */
const files = {
    xamarinAppModels: [
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client.Xamarin.Core/Models/RegisterResultRequest.cs',
                    renameTo: generator => `${generator.mainClientDir}/Models/RegisterResultRequest.cs`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client.Xamarin.Core/Models/UserSaveModel.cs',
                    renameTo: generator => `${generator.mainClientDir}/Models/UserSaveModel.cs`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client.Xamarin.Core/Models/JwtToken.cs',
                    renameTo: generator => `${generator.mainClientDir}/Models/JwtToken.cs`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client.Xamarin.Core/Models/LoginModel.cs',
                    renameTo: generator => `${generator.mainClientDir}/Models/LoginModel.cs`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client.Xamarin.Core/Models/UserModel.cs',
                    renameTo: generator => `${generator.mainClientDir}/Models/UserModel.cs`,
                },
            ],
        },
    ],
    xamarinAppViews: [
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client.Xamarin.Core/Views/HomeView.xaml.cs',
                    renameTo: generator => `${generator.mainClientDir}/Views/HomeView.xaml.cs`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client.Xamarin.Core/Views/HomeView.xaml',
                    renameTo: generator => `${generator.mainClientDir}/Views/HomeView.xaml`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client.Xamarin.Core/Views/LoginView.xaml.cs',
                    renameTo: generator => `${generator.mainClientDir}/Views/LoginView.xaml.cs`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client.Xamarin.Core/Views/LoginView.xaml',
                    renameTo: generator => `${generator.mainClientDir}/Views/LoginView.xaml`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client.Xamarin.Core/Views/MenuPage.xaml.cs',
                    renameTo: generator => `${generator.mainClientDir}/Views/MenuPage.xaml.cs`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client.Xamarin.Core/Views/MenuPage.xaml',
                    renameTo: generator => `${generator.mainClientDir}/Views/MenuPage.xaml`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client.Xamarin.Core/Views/RegisterView.xaml.cs',
                    renameTo: generator => `${generator.mainClientDir}/Views/RegisterView.xaml.cs`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client.Xamarin.Core/Views/RegisterView.xaml',
                    renameTo: generator => `${generator.mainClientDir}/Views/RegisterView.xaml`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client.Xamarin.Core/Views/WelcomeView.xaml.cs',
                    renameTo: generator => `${generator.mainClientDir}/Views/WelcomeView.xaml.cs`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client.Xamarin.Core/Views/WelcomeView.xaml',
                    renameTo: generator => `${generator.mainClientDir}/Views/WelcomeView.xaml`,
                },
            ],
        }
    ],
    xamarinAppViewModels: [
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client.Xamarin.Core/ViewModels/BaseViewModel.cs',
                    renameTo: generator => `${generator.mainClientDir}/ViewModels/BaseViewModel.cs`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client.Xamarin.Core/ViewModels/HomeViewModel.cs',
                    renameTo: generator => `${generator.mainClientDir}/ViewModels/HomeViewModel.cs`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client.Xamarin.Core/ViewModels/LoginViewModel.cs',
                    renameTo: generator => `${generator.mainClientDir}/ViewModels/LoginViewModel.cs`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client.Xamarin.Core/ViewModels/MenuViewModel.cs',
                    renameTo: generator => `${generator.mainClientDir}/ViewModels/MenuViewModel.cs`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client.Xamarin.Core/ViewModels/RegisterViewModel.cs',
                    renameTo: generator => `${generator.mainClientDir}/ViewModels/RegisterViewModel.cs`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client.Xamarin.Core/ViewModels/WelcomeViewModel.cs',
                    renameTo: generator => `${generator.mainClientDir}/ViewModels/WelcomeViewModel.cs`,
                },
            ],
        }
    ],
    xamarinAppServices: [
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client.Xamarin.Core/Services/Configuration.cs',
                    renameTo: generator => `${generator.mainClientDir}/Services/Configuration.cs`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client.Xamarin.Core/Services/IAuthenticationService.cs',
                    renameTo: generator => `${generator.mainClientDir}/Services/IAuthenticationService.cs`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client.Xamarin.Core/Services/AuthenticationService.cs',
                    renameTo: generator => `${generator.mainClientDir}/Services/AuthenticationService.cs`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client.Xamarin.Core/Services/IAbstractEntityService.cs',
                    renameTo: generator => `${generator.mainClientDir}/Services/IAbstractEntityService.cs`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client.Xamarin.Core/Services/AbstractEntityService.cs',
                    renameTo: generator => `${generator.mainClientDir}/Services/AbstractEntityService.cs`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client.Xamarin.Core/Services/IRegisterService.cs',
                    renameTo: generator => `${generator.mainClientDir}/Services/IRegisterService.cs`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client.Xamarin.Core/Services/RegisterService.cs',
                    renameTo: generator => `${generator.mainClientDir}/Services/RegisterService.cs`,
                },
            ],
        }
    ],
    xamarinAppResources: [
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client.Xamarin.Core/Resources/Strings.Designer.cs',
                    renameTo: generator => `${generator.mainClientDir}/Resources/Strings.Designer.cs`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client.Xamarin.Core/Resources/Strings.resx',
                    renameTo: generator => `${generator.mainClientDir}/Resources/Strings.resx`,
                },
            ],
        }
    ],
    xamarinAppBase: [
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client.Xamarin.Core/App.cs',
                    renameTo: generator => `${generator.mainClientDir}/App.cs`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client.Xamarin.Core/AssemblyInfo.cs',
                    renameTo: generator => `${generator.mainClientDir}/AssemblyInfo.cs`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client.Xamarin.Core/FormsApp.xaml.cs',
                    renameTo: generator => `${generator.mainClientDir}/FormsApp.xaml.cs`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client.Xamarin.Core/FormsApp.xaml',
                    renameTo: generator => `${generator.mainClientDir}/FormsApp.xaml`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client.Xamarin.Core/LinkerPreserve.cs',
                    renameTo: generator => `${generator.mainClientDir}/LinkerPreserve.cs`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client.Xamarin.Core/Project.Client.Xamarin.Core.csproj',
                    renameTo: generator => `${generator.mainClientDir}/${generator.pascalizedBaseName}.Client.Xamarin.Core.csproj`,
                },
            ],
        }
    ],
    xamarinAppShared: [
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client.Xamarin.Shared/Constants/ErrorConst.cs',
                    renameTo: generator => `${generator.sharedClientDir}/Constants/ErrorConst.cs`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client.Xamarin.Shared/Project.Client.Xamarin.Shared.csproj',
                    renameTo: generator => `${generator.sharedClientDir}/${generator.pascalizedBaseName}.Client.Xamarin.Shared.csproj`,
                },
            ],
        }
    ],
    xamarinAppAndroid: [
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client.Xamarin.Android/Project.Client.Xamarin.Android.csproj',
                    renameTo: generator => `${generator.androidClientDir}/${generator.pascalizedBaseName}.Client.Xamarin.Android.csproj`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client.Xamarin.Android/MainActivity.cs',
                    renameTo: generator => `${generator.androidClientDir}/MainActivity.cs`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client.Xamarin.Android/SplashScreenActivity.cs',
                    renameTo: generator => `${generator.androidClientDir}/SplashScreenActivity.cs`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client.Xamarin.Android/Project.Client.Xamarin.Android.csproj.user',
                    renameTo: generator => `${generator.androidClientDir}/${generator.pascalizedBaseName}.Client.Xamarin.Android.csproj.user`,
                },
            ],
        }
    ],
    xamarinAppAndroidResourcesValues: [
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client.Xamarin.Android/Resources/values/colors.xml',
                    renameTo: generator => `${generator.androidClientDir}/Resources/values/colors.xml`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client.Xamarin.Android/Resources/values/styles.xml',
                    renameTo: generator => `${generator.androidClientDir}/Resources/values/styles.xml`,
                },
            ],
        }
    ],
    xamarinAppAndroidResourcesLayout: [
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client.Xamarin.Android/Resources/Layout/Tabbar.xml',
                    renameTo: generator => `${generator.androidClientDir}/Resources/Layout/Tabbar.xml`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client.Xamarin.Android/Resources/Layout/Toolbar.xml',
                    renameTo: generator => `${generator.androidClientDir}/Resources/Layout/Toolbar.xml`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client.Xamarin.Android/Resources/Layout/SplashScreen.xml',
                    renameTo: generator => `${generator.androidClientDir}/Resources/Layout/SplashScreen.xml`,
                },
            ],
        },
    ],    
    xamarinAppAndroidResourcesImage: [
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client.Xamarin.Android/Resources/drawable/splashscreen.png',
                    method: 'copy',
                    renameTo: generator => `${generator.androidClientDir}/Resources/drawable/splashscreen.png`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client.Xamarin.Android/Resources/drawable/menu.png',
                    method: 'copy',
                    renameTo: generator => `${generator.androidClientDir}/Resources/drawable/menu.png`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client.Xamarin.Android/Resources/mipmap-anydpi-v26/icon.xml',
                    renameTo: generator => `${generator.androidClientDir}/Resources/mipmap-anydpi-v26/icon.xml`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client.Xamarin.Android/Resources/mipmap-anydpi-v26/icon_round.xml',
                    renameTo: generator => `${generator.androidClientDir}/Resources/mipmap-anydpi-v26/icon_round.xml`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client.Xamarin.Android/Resources/mipmap-hdpi/icon.png',
                    method: 'copy',
                    renameTo: generator => `${generator.androidClientDir}/Resources/mipmap-hdpi/icon.png`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client.Xamarin.Android/Resources/mipmap-hdpi/launcher_foreground.png',
                    method: 'copy',
                    renameTo: generator => `${generator.androidClientDir}/Resources/mipmap-hdpi/launcher_foreground.png`,
                },
            ],
        },
                {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client.Xamarin.Android/Resources/mipmap-mdpi/icon.png',
                    method: 'copy',
                    renameTo: generator => `${generator.androidClientDir}/Resources/mipmap-mdpi/icon.png`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client.Xamarin.Android/Resources/mipmap-mdpi/launcher_foreground.png',
                    method: 'copy',
                    renameTo: generator => `${generator.androidClientDir}/Resources/mipmap-mdpi/launcher_foreground.png`,
                },
            ],
        },
                {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client.Xamarin.Android/Resources/mipmap-xhdpi/icon.png',
                    method: 'copy',
                    renameTo: generator => `${generator.androidClientDir}/Resources/mipmap-xhdpi/icon.png`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client.Xamarin.Android/Resources/mipmap-xhdpi/launcher_foreground.png',
                    method: 'copy',
                    renameTo: generator => `${generator.androidClientDir}/Resources/mipmap-xhdpi/launcher_foreground.png`,
                },
            ],
        },
                {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client.Xamarin.Android/Resources/mipmap-xxhdpi/icon.png',
                    method: 'copy',
                    renameTo: generator => `${generator.androidClientDir}/Resources/mipmap-xxhdpi/icon.png`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client.Xamarin.Android/Resources/mipmap-xxhdpi/launcher_foreground.png',
                    method: 'copy',
                    renameTo: generator => `${generator.androidClientDir}/Resources/mipmap-xxhdpi/launcher_foreground.png`,
                },
            ],
        },
                {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client.Xamarin.Android/Resources/mipmap-xxxhdpi/icon.png',
                    method: 'copy',
                    renameTo: generator => `${generator.androidClientDir}/Resources/mipmap-xxxhdpi/icon.png`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client.Xamarin.Android/Resources/mipmap-xxxhdpi/launcher_foreground.png',
                    method: 'copy',
                    renameTo: generator => `${generator.androidClientDir}/Resources/mipmap-xxxhdpi/launcher_foreground.png`,
                },
            ],
        },
    ], 
    xamarinAppAndroidProperties: [
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client.Xamarin.Android/Properties/AndroidManifest.xml',
                    renameTo: generator => `${generator.androidClientDir}/Properties/AndroidManifest.xml`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client.Xamarin.Android/Properties/AssemblyInfo.cs',
                    renameTo: generator => `${generator.androidClientDir}/Properties/AssemblyInfo.cs`,
                },
            ],
        }
    ],
    xamarinAppiOS: [
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client.Xamarin.iOS/Project.Client.Xamarin.iOS.csproj',
                    renameTo: generator => `${generator.iOSClientDir}/${generator.pascalizedBaseName}.Client.Xamarin.iOS.csproj`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client.Xamarin.iOS/Project.Client.Xamarin.iOS.csproj.user',
                    renameTo: generator => `${generator.iOSClientDir}/${generator.pascalizedBaseName}.Client.Xamarin.iOS.csproj.user`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client.Xamarin.iOS/Main.cs',
                    renameTo: generator => `${generator.iOSClientDir}/Main.cs`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client.Xamarin.iOS/Info.plist',
                    renameTo: generator => `${generator.iOSClientDir}/Info.plist`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client.Xamarin.iOS/Entitlements.plist',
                    method: 'copy',
                    renameTo: generator => `${generator.iOSClientDir}/Entitlements.plist`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client.Xamarin.iOS/AppDelegate.cs',
                    renameTo: generator => `${generator.iOSClientDir}/AppDelegate.cs`,
                },
            ],
        }
    ],
    xamarinAppiOSProperties: [
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client.Xamarin.iOS/Properties/AssemblyInfo.cs',
                    renameTo: generator => `${generator.iOSClientDir}/Properties/AssemblyInfo.cs`,
                },
            ],
        }
    ],
    xamarinAppiOSResources: [
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client.Xamarin.iOS/Resources/LaunchScreen.storyboard',
                    renameTo: generator => `${generator.iOSClientDir}/Resources/LaunchScreen.storyboard`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client.Xamarin.iOS/Resources/Default.png',
                    method: 'copy',
                    renameTo: generator => `${generator.iOSClientDir}/Resources/Default.png`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client.Xamarin.iOS/Resources/Default@2x.png',
                    method: 'copy',
                    renameTo: generator => `${generator.iOSClientDir}/Resources/Default@2x.png`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client.Xamarin.iOS/Resources/Default-568h@2x.png',
                    method: 'copy',
                    renameTo: generator => `${generator.iOSClientDir}/Resources/Default.png`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client.Xamarin.iOS/Resources/Default-Portrait@2x.png',
                    method: 'copy',
                    renameTo: generator => `${generator.iOSClientDir}/Resources/Default-Portrait@2x.png`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client.Xamarin.iOS/Resources/Default-Portrait.png',
                    method: 'copy',
                    renameTo: generator => `${generator.iOSClientDir}/Resources/Default-Portrait.png`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client.Xamarin.iOS/Resources/menu.png',
                    method: 'copy',
                    renameTo: generator => `${generator.iOSClientDir}/Resources/menu.png`,
                },
            ],
        },
        {
            path: CLIENT_SRC_DIR,
            templates: [
                {
                    file: 'Project.Client.Xamarin.iOS/Resources/splashscreen.png',
                    method: 'copy',
                    renameTo: generator => `${generator.iOSClientDir}/Resources/splashscreen.png`,
                },
            ],
        },
    ],
};

module.exports = {
    writeFiles,
    files,
};

function writeFiles() {
    this.writeFilesToDisk(files, this, false, 'xamarin');
}

