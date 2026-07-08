import 'package:flutter/widgets.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:laf_et/main.dart';
import 'package:laf_et/state/app_state.dart';

void main() {
  testWidgets('Приложение запускается и показывает экран пути',
      (WidgetTester tester) async {
    await tester.pumpWidget(LafEtApp(state: AppState()));
    await tester.pump(const Duration(milliseconds: 100));

    // Заголовок первого экрана и раздел панели управления присутствуют.
    expect(find.text('A1 — Kencetay'), findsWidgets);
    expect(find.text('Yol'), findsOneWidget);

    // Аккуратно размонтируем дерево, чтобы остановить непрерывные анимации.
    await tester.pumpWidget(const SizedBox.shrink());
    await tester.pump();
  });
}
