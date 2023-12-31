/**
 * Copyright 2013-2024 the original author or authors from the JHipster project.
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
import { CLIENT_SRC_DIR } from '../generator-dotnetcore-constants.js';

/**
 * The default is to use a file path string. It implies use of the template method.
 * For any other config an object { file:.., method:.., template:.. } can be used
 */
export const files = {
  xamarinAppModels: [
    {
      path: CLIENT_SRC_DIR,
      renameTo: (data, filename) => filename.replace('Project.Client.Xamarin.Core/', data.mainClientDir),
      templates: [
        'Project.Client.Xamarin.Core/Models/RegisterResultRequest.cs',
        'Project.Client.Xamarin.Core/Models/UserSaveModel.cs',
        'Project.Client.Xamarin.Core/Models/JwtToken.cs',
        'Project.Client.Xamarin.Core/Models/LoginModel.cs',
        'Project.Client.Xamarin.Core/Models/UserModel.cs',
      ],
    },
  ],
  xamarinAppViews: [
    {
      path: CLIENT_SRC_DIR,
      renameTo: (data, filename) => filename.replace('Project.Client.Xamarin.Core/', data.mainClientDir),
      templates: [
        'Project.Client.Xamarin.Core/Views/HomeView.xaml.cs',
        'Project.Client.Xamarin.Core/Views/HomeView.xaml',
        'Project.Client.Xamarin.Core/Views/LoginView.xaml.cs',
        'Project.Client.Xamarin.Core/Views/LoginView.xaml',
        'Project.Client.Xamarin.Core/Views/MenuPage.xaml.cs',
        'Project.Client.Xamarin.Core/Views/MenuPage.xaml',
        'Project.Client.Xamarin.Core/Views/RegisterView.xaml.cs',
        'Project.Client.Xamarin.Core/Views/RegisterView.xaml',
        'Project.Client.Xamarin.Core/Views/WelcomeView.xaml.cs',
        'Project.Client.Xamarin.Core/Views/WelcomeView.xaml',
      ],
    },
  ],
  xamarinAppViewModels: [
    {
      path: CLIENT_SRC_DIR,
      renameTo: (data, filename) => filename.replace('Project.Client.Xamarin.Core/', data.mainClientDir),
      templates: [
        'Project.Client.Xamarin.Core/ViewModels/BaseViewModel.cs',
        'Project.Client.Xamarin.Core/ViewModels/HomeViewModel.cs',
        'Project.Client.Xamarin.Core/ViewModels/LoginViewModel.cs',
        'Project.Client.Xamarin.Core/ViewModels/MenuViewModel.cs',
        'Project.Client.Xamarin.Core/ViewModels/RegisterViewModel.cs',
        'Project.Client.Xamarin.Core/ViewModels/WelcomeViewModel.cs',
      ],
    },
  ],
  xamarinAppServices: [
    {
      path: CLIENT_SRC_DIR,
      renameTo: (data, filename) => filename.replace('Project.Client.Xamarin.Core/', data.mainClientDir),
      templates: [
        'Project.Client.Xamarin.Core/Services/Configuration.cs',
        'Project.Client.Xamarin.Core/Services/IAuthenticationService.cs',
        'Project.Client.Xamarin.Core/Services/AuthenticationService.cs',
        'Project.Client.Xamarin.Core/Services/IAbstractEntityService.cs',
        'Project.Client.Xamarin.Core/Services/AbstractEntityService.cs',
        'Project.Client.Xamarin.Core/Services/IRegisterService.cs',
        'Project.Client.Xamarin.Core/Services/RegisterService.cs',
      ],
    },
  ],
  xamarinAppResources: [
    {
      path: CLIENT_SRC_DIR,
      renameTo: (data, filename) => filename.replace('Project.Client.Xamarin.Core/', data.mainClientDir),
      templates: ['Project.Client.Xamarin.Core/Resources/Strings.Designer.cs', 'Project.Client.Xamarin.Core/Resources/Strings.resx'],
    },
  ],
  xamarinAppBase: [
    {
      path: CLIENT_SRC_DIR,
      renameTo: (data, filename) =>
        filename
          .replace('Project.Client.Xamarin.Core/', data.mainClientDir)
          .replace('Project.Client.Xamarin.Core.csproj', `${data.pascalizedBaseName}.Client.Xamarin.Core.csproj`),
      templates: [
        'Project.Client.Xamarin.Core/App.cs',
        'Project.Client.Xamarin.Core/AssemblyInfo.cs',
        'Project.Client.Xamarin.Core/FormsApp.xaml.cs',
        'Project.Client.Xamarin.Core/FormsApp.xaml',
        'Project.Client.Xamarin.Core/LinkerPreserve.cs',
        'Project.Client.Xamarin.Core/Project.Client.Xamarin.Core.csproj',
      ],
    },
  ],
  xamarinAppShared: [
    {
      path: CLIENT_SRC_DIR,
      renameTo: (data, filename) => filename.replace('Project.Client.Xamarin.Shared/', data.sharedClientDir),
      templates: [
        'Project.Client.Xamarin.Shared/Constants/ErrorConst.cs',
        'Project.Client.Xamarin.Shared/Project.Client.Xamarin.Shared.csproj',
      ],
    },
  ],
  xamarinAppAndroid: [
    {
      path: CLIENT_SRC_DIR,
      renameTo: (data, filename) =>
        filename
          .replace('Project.Client.Xamarin.Android/', data.androidClientDir)
          .replace('Project.Client.Xamarin.Android.csproj', `${data.pascalizedBaseName}.Client.Xamarin.Android.csproj`),
      templates: [
        'Project.Client.Xamarin.Android/Project.Client.Xamarin.Android.csproj',
        'Project.Client.Xamarin.Android/MainActivity.cs',
        'Project.Client.Xamarin.Android/SplashScreenActivity.cs',
        'Project.Client.Xamarin.Android/Project.Client.Xamarin.Android.csproj.user',
      ],
    },
  ],
  xamarinAppAndroidResourcesValues: [
    {
      path: CLIENT_SRC_DIR,
      renameTo: (data, filename) => filename.replace('Project.Client.Xamarin.Android/', data.androidClientDir),
      templates: [
        'Project.Client.Xamarin.Android/Resources/values/colors.xml',
        'Project.Client.Xamarin.Android/Resources/values/styles.xml',
      ],
    },
  ],
  xamarinAppAndroidResourcesLayout: [
    {
      path: CLIENT_SRC_DIR,
      renameTo: (data, filename) => filename.replace('Project.Client.Xamarin.Android/', data.androidClientDir),
      templates: [
        'Project.Client.Xamarin.Android/Resources/layout/Tabbar.xml',
        'Project.Client.Xamarin.Android/Resources/layout/Toolbar.xml',
        'Project.Client.Xamarin.Android/Resources/layout/SplashScreen.xml',
      ],
    },
  ],
  xamarinAppAndroidResourcesImage: [
    {
      path: CLIENT_SRC_DIR,
      transform: false,
      renameTo: (data, filename) => filename.replace('Project.Client.Xamarin.Android/', data.androidClientDir),
      templates: [
        'Project.Client.Xamarin.Android/Resources/drawable/splashscreen.png',
        'Project.Client.Xamarin.Android/Resources/drawable/menu.png',
        'Project.Client.Xamarin.Android/Resources/mipmap-anydpi-v26/icon.xml',
        'Project.Client.Xamarin.Android/Resources/mipmap-anydpi-v26/icon_round.xml',
        'Project.Client.Xamarin.Android/Resources/mipmap-hdpi/icon.png',
        'Project.Client.Xamarin.Android/Resources/mipmap-hdpi/launcher_foreground.png',
        'Project.Client.Xamarin.Android/Resources/mipmap-mdpi/icon.png',
        'Project.Client.Xamarin.Android/Resources/mipmap-mdpi/launcher_foreground.png',
        'Project.Client.Xamarin.Android/Resources/mipmap-xhdpi/icon.png',
        'Project.Client.Xamarin.Android/Resources/mipmap-xhdpi/launcher_foreground.png',
        'Project.Client.Xamarin.Android/Resources/mipmap-xxhdpi/icon.png',
        'Project.Client.Xamarin.Android/Resources/mipmap-xxhdpi/launcher_foreground.png',
        'Project.Client.Xamarin.Android/Resources/mipmap-xxxhdpi/icon.png',
        'Project.Client.Xamarin.Android/Resources/mipmap-xxxhdpi/launcher_foreground.png',
      ],
    },
  ],
  xamarinAppAndroidProperties: [
    {
      path: CLIENT_SRC_DIR,
      renameTo: (data, filename) => filename.replace('Project.Client.Xamarin.Android/', data.androidClientDir),
      templates: [
        'Project.Client.Xamarin.Android/Properties/AndroidManifest.xml',
        'Project.Client.Xamarin.Android/Properties/AssemblyInfo.cs',
      ],
    },
  ],
  xamarinAppiOS: [
    {
      path: CLIENT_SRC_DIR,
      renameTo: (data, filename) =>
        filename
          .replace('Project.Client.Xamarin.iOS/', data.iOSClientDir)
          .replace('Project.Client.Xamarin.iOS.csproj', `${data.pascalizedBaseName}.Client.Xamarin.iOS.csproj`),
      templates: [
        'Project.Client.Xamarin.iOS/Project.Client.Xamarin.iOS.csproj',
        'Project.Client.Xamarin.iOS/Project.Client.Xamarin.iOS.csproj.user',
        'Project.Client.Xamarin.iOS/Main.cs',
        'Project.Client.Xamarin.iOS/Info.plist',
        'Project.Client.Xamarin.iOS/Entitlements.plist',
        'Project.Client.Xamarin.iOS/AppDelegate.cs',
      ],
    },
  ],
  xamarinAppiOSProperties: [
    {
      path: CLIENT_SRC_DIR,
      renameTo: (data, filename) => filename.replace('Project.Client.Xamarin.iOS/', data.iOSClientDir),
      templates: ['Project.Client.Xamarin.iOS/Properties/AssemblyInfo.cs'],
    },
  ],
  xamarinAppiOSResources: [
    {
      path: CLIENT_SRC_DIR,
      renameTo: (data, filename) => filename.replace('Project.Client.Xamarin.iOS/', data.iOSClientDir),
      templates: ['Project.Client.Xamarin.iOS/Resources/LaunchScreen.storyboard'],
    },
    {
      path: CLIENT_SRC_DIR,
      transform: false,
      renameTo: (data, filename) => filename.replace('Project.Client.Xamarin.iOS/', data.iOSClientDir),
      templates: [
        'Project.Client.Xamarin.iOS/Resources/Default.png',
        'Project.Client.Xamarin.iOS/Resources/Default@2x.png',
        'Project.Client.Xamarin.iOS/Resources/Default-568h@2x.png',
        'Project.Client.Xamarin.iOS/Resources/Default-Portrait@2x.png',
        'Project.Client.Xamarin.iOS/Resources/Default-Portrait.png',
        'Project.Client.Xamarin.iOS/Resources/menu.png',
        'Project.Client.Xamarin.iOS/Resources/splashscreen.png',
      ],
    },
  ],
};
