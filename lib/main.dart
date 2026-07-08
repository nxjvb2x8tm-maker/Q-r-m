import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import 'app.dart';
import 'state/app_state.dart';
import 'theme/app_theme.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(LafEtApp(state: AppState()));
}

class LafEtApp extends StatelessWidget {
  const LafEtApp({super.key, required this.state});

  final AppState state;

  @override
  Widget build(BuildContext context) {
    return AppScope(
      state: state,
      child: AnimatedBuilder(
        animation: state,
        builder: (context, _) {
          final palette = state.palette;
          SystemChrome.setSystemUIOverlayStyle(
            palette.isDark
                ? SystemUiOverlayStyle.light.copyWith(
                    statusBarColor: Colors.transparent,
                    systemNavigationBarColor: palette.bg,
                  )
                : SystemUiOverlayStyle.dark.copyWith(
                    statusBarColor: Colors.transparent,
                    systemNavigationBarColor: palette.bg,
                  ),
          );
          return MaterialApp(
            title: 'Laf et',
            debugShowCheckedModeBanner: false,
            theme: buildLafTheme(palette),
            home: const RootShell(),
          );
        },
      ),
    );
  }
}
