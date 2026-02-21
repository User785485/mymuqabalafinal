/// Drift local database stub.
///
/// This is a minimal placeholder that will be expanded once offline sync
/// and PowerSync integration are implemented. For now it defines the
/// database class with an empty table set so that the DI container can
/// provide it from the start.
library;

import 'package:drift/drift.dart';

part 'local_database.g.dart';

@DriftDatabase(tables: [])
class AppDatabase extends _$AppDatabase {
  /// Create the database backed by the given [QueryExecutor].
  ///
  /// On mobile, use `NativeDatabase.createInBackground(file)` from the
  /// `drift/native.dart` package.
  AppDatabase(QueryExecutor e) : super(e);

  @override
  int get schemaVersion => 1;
}
