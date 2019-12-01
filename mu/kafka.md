## 简单使用

```bash
#启动和关闭
zookeeper-server-start   /usr/local/etc/kafka/zookeeper.properties
zookeeper-server-stop /usr/local/etc/kafka/zookeeper.properties
kafka-server-start /usr/local/etc/kafka/server.properties
kafka-server-stop /usr/local/etc/kafka/server.properties
```

## 配置说明

* Mac下Kafka，zookeeper位置: /usr/local/etc

* kafka

  ```bash
  .
  ├── connect-console-sink.properties
  ├── connect-console-source.properties
  ├── connect-distributed.properties
  ├── connect-file-sink.properties
  ├── connect-file-source.properties
  ├── connect-log4j.properties
  ├── connect-standalone.properties
  ├── consumer.properties
  ├── log4j.properties
  ├── producer.properties
  ├── server.properties
  ├── tools-log4j.properties
  ├── trogdor.conf
  └── zookeeper.properties
  ```

### 相关概念

* Topic : 数据主题 (队列的抽象)
*  Partition ： 日志的拓展，备份策略 : 主从备份，leader由zookeeper选出（某个 Partition 的数据只会被某一个特定的 Consumer 实例所消费）
* 