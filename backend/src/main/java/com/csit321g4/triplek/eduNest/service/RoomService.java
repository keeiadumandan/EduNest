package com.csit321g4.triplek.eduNest.service;

import com.csit321g4.triplek.eduNest.entity.Room;
import com.csit321g4.triplek.eduNest.repository.RoomRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class RoomService {

    private final RoomRepository repo;

    public RoomService(RoomRepository repo) {
        this.repo = repo;
    }

    public Room create(Room room) {
        return repo.save(room);
    }

    public List<Room> getAll() {
        return repo.findAll();
    }

    public Optional<Room> getById(Integer id) {
        return repo.findById(id);
    }

    public Optional<Room> update(Integer id, Room newData) {
        return repo.findById(id).map(r -> {
            r.setDorm(newData.getDorm());
            r.setRoomNumber(newData.getRoomNumber());
            r.setCapacity(newData.getCapacity());
            r.setMonthlyPrice(newData.getMonthlyPrice());
            r.setOccupancyStatus(newData.getOccupancyStatus());
            return repo.save(r);
        });
    }

    public boolean delete(Integer id) {
        if (repo.existsById(id)) {
            repo.deleteById(id);
            return true;
        }
        return false;
    }
}